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
    // status: {
    //   type: String,
    //   enum: ['booked', 'available', 'rescheduled'], // Adding 'rescheduled' to the possible enum values
    //   default: 'available', // Default status value set to 'available'
    // },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);

