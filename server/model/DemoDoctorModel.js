const mongoose = require("mongoose");

const DemoDoctorSchema = mongoose.Schema({
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
  
 
  totalDoctors: {
    type: Number,
    default:5
  },
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

module.exports = HospitalUser = mongoose.model(
  "DemoDoctors",
  DemoDoctorSchema 
);