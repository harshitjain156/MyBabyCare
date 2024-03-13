const User = require("../model/userModel");
const {fast2sms, generateOTP} = require("../utils/otp");
const {createJwtToken} = require("../utils/jwtToken");
// const { generateOTP, fast2sms } = require("../utils/otp.util");
const Slot = require("../model/slotModel");
const { AUTH_TOKEN_MISSING_ERR, AUTH_HEADER_MISSING_ERR, JWT_DECODE_ERR,INCORRECT_OTP_ERR, USER_NOT_FOUND_ERR, PHONE_ALREADY_EXISTS_ERR } = require("../error")

// const generateOTP = (otp_length) => {
//   var digits = "0123456789";
//   let OTP = "";
//   for (let i = 0; i < otp_length; i++) {
//     OTP += digits[Math.floor(Math.random() * 10)];
//   }
//   return OTP;
// };



// exports.sendOtp = async (req, res, next) => {
//   const phoneNumber = req.query?.phoneNumber || null;
//   const otp = generateOTP(4); // Generate a 4-digit OTP
//   const message = `Your OTP is ${otp}. Please do not share it with anyone.`;

//   // console.log(phoneNumber);

//   if (phoneNumber) {
//     try {
//       // const response = await fast2sms.sendMessage({
//       //   authorization: process.env.FAST2SMS,
//       //   message,
//       //   numbers: ["6392184061"], // Assuming this is the hardcoded phone number
//       // });
//       // console.log(response);

//       await fast2sms(
//         {
//           message,
//           contactNumber: ["6392184061"],
//         },
//         next
//       );

//       console.log(message);

//       return res.json({ status: true, message: "OTP sent successfully" });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ status: false, error: "Failed to send OTP" });
//     }
//   }
// };




exports.createNewUser = async (req, res, next) => {
  try {
    let { phone, name, role } = req.body;

    const phoneLast10Digits = phone.slice(-10);
    // check duplicate phone Number
    const phoneExist = await User.findOne({ phone:phoneLast10Digits });

    if (phoneExist && phoneExist.isVerified) {
      next({ status: 400, message: PHONE_ALREADY_EXISTS_ERR });
      return;
    }
    else if(phoneExist && phoneExist.isVerified===false){

      const otp = generateOTP(4);
        // save otp to user collection
        phoneExist.specialization = "Neurologist",
        phoneExist.department = "Neurology",
        phoneExist.status = "offline",
        phoneExist.imageUrl = "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
        phoneExist.rating = 5,
        phoneExist.name =name;
        phoneExist.role=role.toUpperCase();
        phoneExist.phoneOtp = otp;
        phoneExist.otpExpiryTime = Date.now() + 60000;
    
        await phoneExist.save();
        // send otp to phone number
        await fast2sms(
          {
            message: `Your OTP is ${otp}`,
            contactNumber: phoneExist.phone,
          },
          next
        );
    
        console.log(`Your OTP is ${otp}`);

   

      res.status(200).json({
        type: "success",
        message: "For Account creation process OTP sent to mobile number",
        data: {
          userId: phoneExist._id,
          OTP: `${otp}: Valid for 1 minute`
        },
      });
     
  
    }
    else{

  console.log(role);
    // create new user
    const createUser = new User({
      phone :phoneLast10Digits,
      name,
      role  : role.toUpperCase()
    });

    // save user

    const user = await createUser.save();

        // generate otp
        const otp = generateOTP(4);
        // save otp to user collection
        user.phoneOtp = otp;
        user.otpExpiryTime = Date.now() + 60000;
    
        await user.save();
        // send otp to phone number
        await fast2sms(
          {
            message: `Your OTP is ${otp}`,
            contactNumber: user.phone,
          },
          next
        );
    
        console.log(`Your OTP is ${otp}`);
        
    res.status(200).json({
      type: "success",
      message: "For Account creation process OTP sent to mobile number",
      data: {
        userId: user._id,
        OTP: `${otp}: Valid for 1 minute`,
        
      },
    });
  }

  } catch (error) {
    next(error);
  }
};



// ------------ login with phone otp ----------------------------------

exports.loginWithPhoneOtp = async (req, res, next) => {
  try {

    const { phone } = req.body;

    const phoneLast10Digits = phone.slice(-10);
    
    const user = await User.findOne({ phone:phoneLast10Digits });

    if (!user||!user.isVerified) {
      next({ status: 400, message: USER_NOT_FOUND_ERR });
      return;
    }

     // generate otp
     const otp = generateOTP(4);
     // save otp to user collection
     user.phoneOtp = otp;
     user.otpExpiryTime = Date.now() + 60000;
     
     await user.save();
     // send otp to phone number
     await fast2sms(
       {
         message: `Your OTP is ${otp}`,
         contactNumber: user.phone,
       },
       next
     );
 
     console.log(`Your OTP is ${otp}`);

    res.status(201).json({
      type: "success",
      message: "OTP sent to your registered phone number",
      data: {
        userId: user._id,
        OTP: `${otp}: Valid for 1 minute`,
        role:  user.role,
        username: user.name
      },
    });

   

  } catch (error) {
    next(error);
  }
};

// ---------------------- verify phone otp -------------------------

exports.verifyPhoneOtp = async (req, res, next) => {
  try {
    const { otp, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      next({ status: 400, message: USER_NOT_FOUND_ERR });
      return;
    }
  

    if (user.phoneOtp !== otp) {
      next({ status: 400, message: INCORRECT_OTP_ERR });
      return;
    }
    if (user.otpExpiryTime < Date.now()) {
      next({ status: 400, message: "OTP expired" });
      return;
    }
    const token = createJwtToken({ userId: user._id });

    user.phoneOtp = "";
    user.isVerified = true;
    // user.isAccountVerified = true;
    await user.save();

    res.status(201).json({
      type: "success",
      message: "OTP verified successfully",
      data: {
        token,
        userId: user._id,
        role:  user.role,
        imageUrl: user.imageUrl,
        username: user.name
      },
    });
  } catch (error) {
    next(error);
  }
};

