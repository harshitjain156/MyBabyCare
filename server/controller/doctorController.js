const User = require("../model/userModel");

exports.allDoctors =  async (req, res) => {
    try {
      // Find all users with role 'DOCTOR'
      const doctors = await User.find({ role: 'DOCTOR', isVerified: true });
      res.json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  
  
