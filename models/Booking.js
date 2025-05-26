const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  groundId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ground',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'completed'],
    default: 'active'
  },
  totalAmount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Compound index to prevent double booking
bookingSchema.index({ groundId: 1, date: 1, 'timeSlot.startTime': 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
