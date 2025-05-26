const Joi = require('joi');

const bookingSchema = Joi.object({
  groundId: Joi.string().required(),
  date: Joi.date().min('now').required(),
  timeSlot: Joi.object({
    startTime: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    endTime: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
  }).required()
});

const validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  const { startTime, endTime } = req.body.timeSlot;
  const start = new Date(`2000-01-01T${startTime}:00`);
  const end = new Date(`2000-01-01T${endTime}:00`);
  
  if (end <= start) {
    return res.status(400).json({ error: 'End time must be after start time' });
  }
  
  next();
};

module.exports = { validateBooking };