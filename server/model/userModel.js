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