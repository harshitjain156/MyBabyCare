const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    
    default:"xyz"
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
  },
  longitude: {
    type: Number,
    required: true,
  },
  beds: {
    type: Number,
    default:10
  },
  totalBeds: {
    type: Number,
    default:50
  },
  doctors: {
    type: Number,
    default:2
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
  "Hospitals",
  hospitalSchema
);