const mongoose = require('mongoose');

const { Schema } = mongoose;

const slotSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  slots: [{
    timeslot: { type: String, required: true },
    status: {
      type: String,
      enum: ['Booked', 'Available', 'Rescheduled', 'Cancelled'], // Adding 'rescheduled' to the possible enum values
      default: 'Available', // Default status value set to 'available'
    },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);

