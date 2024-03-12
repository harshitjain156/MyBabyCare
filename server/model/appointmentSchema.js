const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeslot: {
    type: String,
    required: true
  },
  childName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  additionalDetails: {
    type: String
  },
  timeslotId: {
    type: String,
    required: true
  },
  status: {
      type: String,
      enum: ['Pending', 'Booked', 'Cancelled', 'Rescheduled'], // Adding 'rescheduled' to the possible enum values
      default: 'Pending', // Default status value set to 'available'
    },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
