const User = require("../model/userModel");
const NodeCache = require( "node-cache" );
const myCache =new NodeCache( { stdTTL: 100, checkperiod: 120 } );

exports.allDoctors =  async (req, res) => {
    try {
      if(myCache.has("all-doctors")){
        console.log("cached data")
        res.json(myCache.get("all-doctors"));
      }
      // Find all users with role 'DOCTOR'
      else{
        const doctors = await User.find({ role: 'DOCTOR', isVerified: true });
      console.log("api data")

      myCache.set("all-doctors",doctors)
      res.json(doctors);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  
  
