const express = require('express');
const Hospitals=require('../model/hospitalModel')
const VaccinationCenters=require('../model/vaccinationCentersModel')
const router = express.Router();

const DoctorClinic=require('../model/doctorClinic')
const NodeCache = require( "node-cache" );
const myCache =new NodeCache( { stdTTL: 100, checkperiod: 120 } );

const distCalc = require("../utils/distCalc");







router.post('/add-data', async (req, res) => {
    try {
        // Create the vaccine
       const {name, lat,lng} = req.body
       if(!name){
        return res.status(400).json({ success: false, message: "Name is required"});
       }
       if(!lat && !lng){
        return res.status(400).json({ success: false, message: "Location is required"});
       }
       
       const newData=await Hospitals.create({
        name,
        latitude:lat,
        longitude:lng
       })
       
        return res.status(201).json({ message: 'Data added',data:newData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
})




router.get('/get-data', async (req, res) => {
    
    

    try {
        // Create the vaccine
        const { latitude, longitude, range,type } = req.query;
       if(type=="hospital"){
        Hospitals.find({})
        .then((hospitals) => {
          if (hospitals.length === 0) {
            res.status(404).json({ message: "No hospital found" });
          } else {
            let arr = hospitals.map((hospital) => {
              let hosp_dist = {};
    
              const dist = distCalc(
                latitude,
                longitude,
                hospital.latitude,
                hospital.longitude
              );
              hosp_dist.distance = dist;
              hosp_dist.name = hospital.name;
              
              hosp_dist.phoneNumber = hospital.phoneNumber;
              hosp_dist.latitude = hospital.latitude;
              hosp_dist.longitude = hospital.longitude;
              
              hosp_dist.availability = hospital.availability;
              hosp_dist.totalDoctors = hospital.totalDoctors;
              hosp_dist.totalBeds = hospital.totalBeds;
              hosp_dist.enable = hospital.enable;
              // hosp_dist.verified = hospital.verified;
              hosp_dist.note = hospital.note;
    
              return hosp_dist;
            });
            arr = arr.filter((hospital) => hospital.distance <= range );
    
            if (arr.length === 0) {
              res.status(404).json({ message: "No nearby hospital found" });
            } else {
              res.json({
                message:"success",
                data:arr});
            }
          }
        })
        .catch((err) => res.json(err));
       }
       else if(type=='vaccination-center'){
        VaccinationCenters.find({})
        .then((vaccinationCenter) => {
          if (vaccinationCenter.length === 0) {
            res.status(404).json({ message: "No hospital found" });
          } else {
            let arr = vaccinationCenter.map((center) => {
              let hosp_dist = {};
    
              const dist = distCalc(
                latitude,
                longitude,
                center.latitude,
                center.longitude
              );
              hosp_dist.distance = dist;
              hosp_dist.name = center.name;
              
              hosp_dist.phoneNumber = center.phoneNumber;
              hosp_dist.latitude = center.latitude;
              hosp_dist.longitude = center.longitude;
              
              hosp_dist.availability = center.availability;
              hosp_dist.totalDoctors = center.totalDoctors;
              hosp_dist.totalBeds = center.totalBeds;
              hosp_dist.enable = center.enable;
              // hosp_dist.verified = hospital.verified;
              hosp_dist.note = center.note;
    
              return hosp_dist;
            });
            arr = arr.filter((hospital) => hospital.distance <= range );
    
            if (arr.length === 0) {
              res.status(404).json({ message: "No nearby center found" });
            } else {
              res.json({
                message:"success",
                data:arr});
            }
          }
        })
        .catch((err) => res.json(err));
       }
       else if(type=='doctor'){
        DoctorClinic.find({})
        .then((doctorClinic) => {
          if (doctorClinic.length === 0) {
            res.status(404).json({ message: "No doctor found" });
          } else {
            let arr = doctorClinic.map((center) => {
              let hosp_dist = {};
    
              const dist = distCalc(
                latitude,
                longitude,
                center.latitude,
                center.longitude
              );
              hosp_dist.distance = dist;
              hosp_dist.name = center.name;
              hosp_dist.clinicName=center.clinicName
              hosp_dist.phoneNumber = center.phoneNumber;
              hosp_dist.latitude = center.latitude;
              hosp_dist.longitude = center.longitude;
              
              hosp_dist.availability = center.availability;
             
              hosp_dist.enable = center.enable;
              // hosp_dist.verified = hospital.verified;
              hosp_dist.note = center.note;
    
              return hosp_dist;
            });
            arr = arr.filter((hospital) => hospital.distance <= range );
    
            if (arr.length === 0) {
              res.status(404).json({ message: "No nearby center found" });
            } else {
              res.json({
                message:"success",
                data:arr});
            }
          }
        })
        .catch((err) => res.json(err));
       }
       else{
        res.status(404).json({ message: "No Data found" });
       }
    
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }






    // try {
    //     // Create the vaccine
    //    const {name, lat,lng} = req.body
    //    if(!name){
    //     return res.status(400).json({ success: false, message: "Name is required"});
    //    }
    //    if(!lat && !lng){
    //     return res.status(400).json({ success: false, message: "Location is required"});
    //    }
       
    //    const newData=await Hospitals.create({
    //     name,
    //     latitude:lat,
    //     longitude:lng
    //    })
       
    //     return res.status(201).json({ message: 'Data added',data:newData });
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: 'Server error' });
    // }
})


module.exports = router;
