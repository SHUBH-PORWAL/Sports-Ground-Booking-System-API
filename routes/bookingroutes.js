const express = require('express');
const bookingController = require('../controllers/bookingController');
const authenticateToken = require('../middleware/auth');
const { validateBooking } = require('../validators/bookingValidator');

const router = express.Router();

router.post('/bookings', authenticateToken, validateBooking, bookingController.createBooking);
router.get('/bookings/:userId', authenticateToken, bookingController.getUserBookings);
router.get('/bookings', authenticateToken, bookingController.getAllBookings);
router.delete('/bookings/:bookingId', authenticateToken, bookingController.cancelBooking);

module.exports = router;