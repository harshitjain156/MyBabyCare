const mongoose = require('mongoose');

const { Schema } = mongoose;

const slotSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    week: {
      type: Map,
      of: [{
        day: String,
        slots: [
          {
            timeslot: { type: String, required: true },
            
          },
        ],
      }],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Slot', slotSchema);

