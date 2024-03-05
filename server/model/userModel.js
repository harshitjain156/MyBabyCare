const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,

    },

    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    specialization: {
      type: String,
      default: "Neurologist"
    },
    department: {
      type: String,
      default: "Neurolgy"

    },
    status: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline'
    },
    imageUrl: {
      type: String,
      default: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg"

    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 4
    },
    role :{
     type : String,
     enum:["USER", "DOCTOR"],
     default:"USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

   phoneOtp:String,
   otpExpiryTime: Date 


  },
  { timestamps: true }
);

module.exports = model("User", userSchema);