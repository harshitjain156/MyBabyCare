const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
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
  }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
