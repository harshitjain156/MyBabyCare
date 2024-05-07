const mongoose = require("mongoose");
const { Schema } = mongoose;
const doctorClinicSchema = mongoose.Schema({
    doctorId:{type:Schema.Types.ObjectId},
  name: {
    type: String,
  },
  email: {
    type: String,
    
    default:"zyx"
  },
  date: {
    type: Date,
    default: Date.now,
  },
  website: {
    type: String,
    default:"abc.com"
  },
  phoneNumber: {
    type: Number,
    default:1234567890
  },
  latitude: {
    type: Number,
    required: true,
    default:"28.608"
  },
  longitude: {
    type: Number,
    required: true,
    default:"77.380"
  },
  clinicName:{type:String},
  address:{type:String},
  availability: {
    type: Boolean,
    default:true
  },
  note: {
    type: String,
    default:""
  },
  enable: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model(
  "Doctor Clinic",
  doctorClinicSchema 
);