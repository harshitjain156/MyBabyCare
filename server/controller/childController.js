const Child = require("../model/childModel");
const vaccineModel = require("../model/vaccineModel");


exports.addNewChild =  async (req, res) => {

    console.log(req.body)
    try{
        const {name, birthdate, gender, userId, vaccinationsDone, vaccinationsTotal} = req.body;

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

exports.getAllChild = async(req, res)=>{
    try{
        const {userId} =  req.query;
        
        if(!userId){
            return res.status(400).json({ msg: "UserID is required"});
        }


        const children = await Child.find({ userId});

        res.status(200).json({
            success: true,
            count: children.length,
            data:children})

    }catch(err){
        consle.log(err);
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
        if(!notify){
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

