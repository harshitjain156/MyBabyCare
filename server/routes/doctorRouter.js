const express = require('express');
const {allDoctors} = require("../controller/doctorController")
const DoctorClinic=require('../model/doctorClinic')
const router = express.Router();


router.get("/doctors", allDoctors);
router.post('/doctors/add/:doctorId',async (req,res)=>{
    try {
        const doctorId=req.params.doctorId;
        // Create the vaccine
       const {name,clinicName,phone,email,address, lat,lng} = req.body
       if(!name){
        return res.status(400).json({ success: false, message: "Name is required"});
       }
       if(!lat && !lng){
        return res.status(400).json({ success: false, message: "Location is required"});
       }
       
       const newData=await DoctorClinic.create({
        name,
        latitude:lat,
        longitude:lng,
        address:address,
        email:email,
        phoneNumber:phone,
        clinicName:clinicName,
        doctorId:doctorId
       })
       
        return res.status(201).json({ message: 'Data added',data:newData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }

})
module.exports = router;
