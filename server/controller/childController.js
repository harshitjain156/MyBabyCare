const Child = require("../model/childModel");
const vaccineModel = require("../model/vaccineModel");
const Vaccine=require('../model/vaccineModel')
const NodeCache = require( "node-cache" );
const myCache =new NodeCache( { stdTTL: 40, checkperiod: 120 } );

exports.addNewChild =  async (req, res) => {

    // console.log(req.body)
    try{
        const {name, birthdate, gender, userId, vaccinationsDone, vaccinationsTotal} = req.body;
        if(myCache.has(userId+"child")){
            console.log(userId+"child")
        }
        myCache.del(userId+"child")
        if (!name || !birthdate || !gender || !userId){
            return res.status(400).json({msg: 'Missing fields'});
        } 
        const createChild = new Child({ 
        name, 
        birthdate,
        gender,
        userId,
        vaccinationsDone,
        vaccinationsTotal

        });
      
          // save user
      
          const newChild = await createChild.save();
          
        console.log(newChild)

        if (!newChild){
            return res.status(400).json({message: 'Failed to create a new Child'});
        }

        res.status(201
            ).json({ message:`Successfully created a new Child with ID: ${newChild.id}`, data: newChild });
        }
    catch(err){
        console.log('Error in adding new child', err);
        return res.status(400).json({message: 'Failed to create a new Child'});
    }

};

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

exports.createNewChild= async (req,res)=>{
    try{
        const {name, birthdate, gender, userId} = req.body;
        if (!name || !birthdate || !gender || !userId){
            return res.status(400).json({success: false, message: 'Missing fields'});
        } 
        if(myCache.has(userId+"child")){
            console.log(userId+"child")
        }
        myCache.del(userId+"child")
    let myVaccinesArray=[];
     let myVaccines= await Vaccine.find({tag: "general"}).exec();
     console.log(myVaccines.length);

     for(i=0;i<myVaccines.length;i++){
        console.log(myVaccines[i]._id);
        
        let nextDate=predictNextDate(parseInt(myVaccines[i].age.split(" ")[0]),birthdate);
        let currentDate=new Date();
        let dateStatus=compareDates(nextDate);
        console.log(dateStatus)
        myVaccinesArray.push({
            vaccineId: myVaccines[i]._id, // Replace someVaccineId with the actual ObjectId
            status: dateStatus,
            notify: true,
            predictedDate: nextDate, // Replace somePredictedDate with the actual Date
            vaccinatedDate: null,
            recordImage:null
        });
        
        
        
     }
     const createChild = new Child({ 
        name, 
        birthdate,
        gender,
        userId,
        vaccinationsDone:0,
        vaccinationsTotal:myVaccines.length,
        vaccinations: myVaccinesArray

        });
      
          // save user
          
        const newChild = await createChild.save();

        if (!newChild){
            return res.status(400).json({success: false, message: 'Failed to create a new Child'});
        }

        // console.log(myVaccinesArray)

        // console.log(newChild);

       
 res.status(201).json({ 
    success: true,
    message:`Successfully created a new Child`, data: newChild });
        
    // res.json(newChild);
    }catch(err){
        console.log('Error in adding new child', err);
        return res.status(400).json({success: false, message: 'Failed to create a new Child'});
    }
}
exports.getAllChild = async(req, res)=>{
    try{
        const {userId} =  req.query;

        if(!userId){
            return res.status(400).json({ msg: "UserID is required"});
        }
       
    
        if(myCache.has(userId+"child")){
            console.log("cached data")
            const childData=myCache.get(userId+"child");
            // console.log(childData)
            return res.status(200).json({
                success: true,
                count: childData.length,
                data:childData})
        }

        const children = await Child.find({ userId}).select("-vaccinations");
        myCache.set(userId+"child",children)
        res.status(200).json({
            success: true,
            count: children.length,
            data:children})
  
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"})
    }
    
}
               
exports.deleteChild = async (req, res) => {
    try {
        const { id } = req.params;

        const child = await Child.findById(id);

        if (!child) {
            return res.status(404).json({ message: "Child not found" });
        }
        if(myCache.has(child.userId+"child")){
            console.log(child.userId+"child")
        }
        myCache.del(child.userId+"child")
        await child.deleteOne();

        res.status(200).json({ message: "Child deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};               



exports.notificationController = async (req, res)=>{
    try {
        let vaccineId=req.body.vaccineId;
        let notify =req.body.notify;
        if(notify===null){
            res.status(400).json({success: false, message: "Notification status is required"});
        }
        if(!vaccineId){
            return res.status(400).json({success: false, message: "VaccineID is required"});
        }

        const updated = await Child.findOneAndUpdate(
            { 'vaccinations._id': vaccineId }, // Find slot with the given slotId
            { $set: { 'vaccinations.$.notify': notify } }, // Set the new status for the matched slot
            { new: true } // To return the updated slot
          );

        
        res.status(200).json({ success: true, message: "Notication is successfully", data: updated });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}




// Route to create a new vaccine
exports.addVaccineForParticularChild = async (req, res) => {
    try {
        // Create the vaccine
       const {name, desc, date} = req.body
       if(!name){
        return res.status(400).json({ success: false, message: "Vaccine name is required"});
       }
       if(!desc){
        return res.status(400).json({ success: false, message: "Description is required"});
       }
       if(!date){
        return res.status(400).json({ success: false, message: "Date is required"});
       }
       const childId = req.body.childId;
       if(!childId){
        return res.status(400).json({ success: false, message: "Child Id is required"});
       }

        const newVaccine = await vaccineModel.create({
            name,
            desc,
            tag: "particular"
        });

        // Find the child to update
         // Assuming you're sending childId along with the vaccine data
        const child = await Child.findById(childId);

        // If the child exists, add the new vaccine to its vaccinations array
        if (child) {
          await  child.vaccinations.push({
                vaccineId: newVaccine._id,
                status: 'upcoming', // Default status
                notify: true, // Default notify value
                predictedDate:date 
            });

            child.vaccinationsTotal++;
            await child.save();
        } else {
            return res.status(404).json({ message: 'Child not found' });
        }

        return res.status(201).json({ message: 'Vaccine created and added to child' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

