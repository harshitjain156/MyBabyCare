const express = require( 'express' );
const router = express.Router();
const {addNewChild, getAllChild, deleteChild, notificationController, addVaccineForParticularChild, createNewChild} = require("../controller/childController");
const Child = require("../model/childModel");

const Vaccine=require('../model/vaccineModel')
// Require controller modules.
router.post("/add-new-child", addNewChild);
router.get("/all-child", getAllChild);
router.delete("/delete/:id", deleteChild)
router.patch("/update-notification-status", notificationController)
router.post("/add-my-vaccine", addVaccineForParticularChild)


// router.post("/create-new-child",async (req,res)=>{
//     try{
//         const {name, birthdate, gender, userId} = req.body;
//         if (!name || !birthdate || !gender || !userId){
//             return res.status(400).json({success: false, message: 'Missing fields'});
//         } 

//     let myVaccinesArray=[];
//      let myVaccines= await Vaccine.find().exec();
//      console.log(myVaccines.length);

//      for(i=0;i<myVaccines.length;i++){
//         console.log(myVaccines[i]._id);
        
//         let nextDate=predictNextDate(parseInt(myVaccines[i].age.split(" ")[0]),birthdate);
//         let currentDate=new Date();
//         let dateStatus=compareDates(nextDate);
//         console.log(dateStatus)
//         myVaccinesArray.push({
//             vaccineId: myVaccines[i]._id, // Replace someVaccineId with the actual ObjectId
//             status: dateStatus,
//             notify: true,
//             predictedDate: nextDate, // Replace somePredictedDate with the actual Date
//             vaccinatedDate: null
//         });
        
        
        
//      }
//      const createChild = new Child({ 
//         name, 
//         birthdate,
//         gender,
//         userId,
//         vaccinationsDone:0,
//         vaccinationsTotal:myVaccines.length,
//         vaccinations: myVaccinesArray

//         });
      
//           // save user
      
//         const newChild = await createChild.save();

//         if (!newChild){
//             return res.status(400).json({success: false, message: 'Failed to create a new Child'});
//         }

//         console.log(myVaccinesArray)

//         console.log(newChild);

       
//  res.status(201).json({ 
//     success: true,
//     message:`Successfully created a new Child`, data: newChild });
        
//     // res.json(newChild);
//     }catch(err){
//         console.log('Error in adding new child', err);
//         return res.status(400).json({success: false, message: 'Failed to create a new Child'});
//     }
// })


// function predictNextDate(durationInMonths,birthdate) {
//     // Get today's date
//     let currentDate = new Date(birthdate);

//     // Calculate the next date by adding the duration in months
//     let nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + durationInMonths, currentDate.getDate());

//     // Return the next date
//     return nextDate;
// }
// function compareDates(predictedDate) {
//     // Get the current date
//     let currentDate = new Date();

//     // Convert both dates to milliseconds since January 1, 1970
//     let currentTime = currentDate.getTime();
//     let predictedTime = predictedDate.getTime();

//     // Compare the current time with the predicted time
//     if (predictedTime > currentTime) {
//         return "upcoming"; // Predicted date is in the future
//     } else if (predictedTime < currentTime) {
//         return "delayed"; // Predicted date is in the past
//     } else {
//         return "today"; // Predicted date is today
//     }
// }



// router.post("/update-child-vaccine",async(req,res)=>{
//     try{

//         let vaccineId=req.body.vaccineId;
//         let _id=req.body.childId;
//         let vaccinatedDate=req.body.vaccinatedDate;
//         console.log(_id)
//         if(!_id){
//             return res.status(400).json({success: false, message: "ChildID is required"});
//         }
//         if(!vaccineId){
//             return res.status(400).json({success: false, message: "VaccineID is required"});
//         }
//         if(!vaccinatedDate){
//             return res.status(400).json({success: false, message: "Vaccinated date is required"});
//         }

//         let findChildVaccinations=await Child.findOne({_id});

//         let myVaccineArray=findChildVaccinations.vaccinations;
//         let vaccinationsDone=findChildVaccinations.vaccinationsDone;
//         let myVaccineId;
//         for(i=0;i<myVaccineArray.length;i++){

//             if(myVaccineArray[i].vaccineId==vaccineId && myVaccineArray[i].status!="Done"){
//                 myVaccineId=myVaccineArray[i]._id
//                 myVaccineArray[i].status="Done"
//                 myVaccineArray[i].vaccinatedDate=vaccinatedDate;
//                 myVaccineArray[i].notify=false;
//                 vaccinationsDone+=1;
//             }
//         }
        
//         let updateVaccinationArray=await Child.findOneAndUpdate({_id},({vaccinations:myVaccineArray,vaccinationsDone:vaccinationsDone}),{new :true}).select();
//         console.log(updateVaccinationArray)
//         res.status(200).json( { 
//             success: true,
//             data: updateVaccinationArray});


//     }catch(err){
//         console.log(err.message)
//         res.status(404).json({success: false, message: 'Failed to update the Vaccine Details', });
//     }
// })


// router.get("/get-mychild-details/:id",async(req,res)=>{
//     try{

        
//         let _id=req.params.id;
//         if(!_id){
//             return res.status(400).json({ success: false, message: "ChildID is required"});
//         }

//         let findChildVaccinations=await Child.findOne({_id}).populate("vaccinations.vaccineId");
//         console.log(findChildVaccinations)
//         res.status(200).json({
//             success: true,
//             data: findChildVaccinations
//             });


//     }catch(err){
//         res.status(404).json({success: false, message: 'Failed to get the Child Details'});
//     }
// })


// router.post("/add-new-vaccines",(req,res)=>{
//     const vaccine=new Vaccine({
//         name:req.body.name,
//         age:req.body.age,
//         desc:req.body.desc
//     })

//     vaccine.save().then(result=>{
//         res.status(200).json({
//             success: true,
//             message:"success",
//             data:result
//         })
//     })
// })

// module.exports = router;





router.post("/create-new-child",createNewChild)


function predictNextDate(durationInMonths,birthdate) {
    // Get today's date
    let currentDate = new Date(birthdate);

    // Calculate the next date by adding the duration in months
    let nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + durationInMonths, currentDate.getDate());

    // Return the next date
    return nextDate;
}
function compareDates(predictedDate) {
    // Get the current date
    let currentDate = new Date();

    // Convert both dates to milliseconds since January 1, 1970
    let currentTime = currentDate.getTime();
    let predictedTime = predictedDate.getTime();

    // Compare the current time with the predicted time
    if (predictedTime > currentTime) {
        return "upcoming"; // Predicted date is in the future
    } else if (predictedTime < currentTime) {
        return "delayed"; // Predicted date is in the past
    } else {
        return "today"; // Predicted date is today
    }
}



router.post("/update-child-vaccine",async(req,res)=>{
    try{
        let verifyImage=req.body.imageUrl
        let vaccineId=req.body.vaccineId;
        let _id=req.body.childId;
        let vaccinatedDate=req.body.vaccinatedDate;
        console.log(_id)
        if(!_id){
            return res.status(400).json({success: false, message: "ChildID is required"});
        }
        if(!vaccineId){
            return res.status(400).json({success: false, message: "VaccineID is required"});
        }
        if(!vaccinatedDate){
            return res.status(400).json({success: false, message: "Vaccinated date is required"});
        }

        let findChildVaccinations=await Child.findOne({_id});

        let myVaccineArray=findChildVaccinations.vaccinations;
        let vaccinationsDone=findChildVaccinations.vaccinationsDone;
        let myVaccineId;
        console.log(verifyImage);
        for(i=0;i<myVaccineArray.length;i++){

            if(myVaccineArray[i].vaccineId==vaccineId && myVaccineArray[i].status!="Done"){
                myVaccineId=myVaccineArray[i]._id
                myVaccineArray[i].status="Done"
                myVaccineArray[i].vaccinatedDate=vaccinatedDate;
                myVaccineArray[i].notify=false;
                myVaccineArray[i].recordImage=verifyImage;
                vaccinationsDone+=1;
            }
        }
        
        let updateVaccinationArray=await Child.findOneAndUpdate({_id},({vaccinations:myVaccineArray,vaccinationsDone:vaccinationsDone}),{new :true}).select();
        console.log(updateVaccinationArray)
        res.status(200).json( { 
            success: true,
            data: updateVaccinationArray});


    }catch(err){
        console.log(err.message)
        res.status(404).json({success: false, message: 'Failed to update the Vaccine Details', });
    }
})


router.get("/get-mychild-details/:id",async(req,res)=>{
    try{

        
        let _id=req.params.id;
        if(!_id){
            return res.status(400).json({ success: false, message: "ChildID is required"});
        }

        let findChildVaccinations=await Child.findOne({_id}).populate("vaccinations.vaccineId");
        console.log(findChildVaccinations)
        res.status(200).json({
            success: true,
            data: findChildVaccinations
            });


    }catch(err){
        res.status(404).json({success: false, message: 'Failed to get the Child Details'});
    }
})


router.post("/add-new-vaccines",(req,res)=>{
    const vaccine=new Vaccine({
        name:req.body.name,
        age:req.body.age,
        desc:req.body.desc
    })

    vaccine.save().then(result=>{
        res.status(200).json({
            success: true,
            message:"success",
            data:result
        })
    })
})

module.exports = router;
