const Booking = require('../models/Booking');
const Ground = require('../models/Ground');

class BookingController {
  async createBooking(req, res) {
    try {
      const { groundId, date, timeSlot } = req.body;
      const userId = req.user._id;

      // Check if ground exists
      const ground = await Ground.findById(groundId);
      if (!ground || !ground.isActive) {
        return res.status(404).json({ error: 'Ground not found' });
      }

      // Check for existing booking at same time slot
      const existingBooking = await Booking.findOne({
        groundId,
        date: new Date(date),
        'timeSlot.startTime': timeSlot.startTime,
        status: 'active'
      });

      if (existingBooking) {
        return res.status(400).json({ error: 'Time slot already booked' });
      }

      // Calculate total amount (assuming hourly rate)
      const startTime = new Date(`2000-01-01T${timeSlot.startTime}:00`);
      const endTime = new Date(`2000-01-01T${timeSlot.endTime}:00`);
      const hours = (endTime - startTime) / (1000 * 60 * 60);
      const totalAmount = hours * ground.pricePerHour;

      // Create booking
      const booking = new Booking({
        userId,
        groundId,
        date: new Date(date),
        timeSlot,
        totalAmount
      });

      await booking.save();
      await booking.populate(['userId', 'groundId']);

      // Emit real-time update
      const io = req.app.get('io');
      io.emit('newBooking', {
        message: 'New booking created',
        booking: booking
      });

      res.status(201).json({
        message: 'Booking created successfully',
        data: booking
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Time slot already booked' });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getUserBookings(req, res) {
    try {
      const { userId } = req.params;

      // Ensure user can only access their own bookings or admin access
      if (req.user._id.toString() !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const bookings = await Booking.find({ userId })
        .populate('groundId')
        .sort({ date: -1 });

      res.json({
        message: 'Bookings fetched successfully',
        data: bookings
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllBookings(req, res) {
    try {
      const bookings = await Booking.find()
        .populate(['userId', 'groundId'])
        .sort({ date: -1 });

      res.json({
        message: 'All bookings fetched successfully',
        data: bookings
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cancelBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const userId = req.user._id;

      const booking = await Booking.findOne({ _id: bookingId, userId });

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      if (booking.status === 'cancelled') {
        return res.status(400).json({ error: 'Booking already cancelled' });
      }

      // Check if booking can be cancelled (e.g., at least 1 hour before)
      const bookingDateTime = new Date(booking.date);
      const [hours, minutes] = booking.timeSlot.startTime.split(':');
      bookingDateTime.setHours(parseInt(hours), parseInt(minutes));

      const now = new Date();
      const timeDifference = bookingDateTime - now;
      const oneHour = 60 * 60 * 1000;

      if (timeDifference < oneHour) {
        return res.status(400).json({ 
          error: 'Cannot cancel booking less than 1 hour before start time' 
        });
      }

      booking.status = 'cancelled';
      await booking.save();

      // Emit real-time update
      const io = req.app.get('io');
      io.emit('bookingCancelled', {
        message: 'Booking cancelled',
        bookingId: booking._id
      });

      res.json({
        message: 'Booking cancelled successfully',
        data: booking
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BookingController();