const mongoose = require('mongoose');

const groundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Football', 'Basketball', 'Tennis', 'Cricket', 'Badminton']
  },
  location: {
    type: String,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  amenities: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ground', groundSchema);
