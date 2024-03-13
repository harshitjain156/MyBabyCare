
// Assume you're using Express.js for routing

// POST endpoint for booking a slot

const  Appointment = require("../model/appointmentSchema");
const Slot = require("../model/slotModel");
const moment = require('moment'); 


exports.createSlots =  async (req, res) => {
  try {
    // Dummy data to store, you can adjust this as needed
    // const slotData = {
    //   doctorId: "65e80a603f24f7a2c7ad3801", // Example doctorId, replace with actual value
    //   date: new Date('2024-03-11'), // Example date, replace with actual value
    //   slots: [
    //     { timeslot: '09:00 AM' },
    //     { timeslot: '10:00 AM' },
    //     { timeslot: '11:00 AM' },
    //     // Add more time slots as needed
    //   ],
    // };

    const { doctorId, date, slots} = req.body;

    // Create a new slot document and save it to the database
    const slot = await Slot.create({doctorId, date, slots});

    res.status(201).json({ success: true, slot });
  } catch (error) {
    console.error('Error storing time slots:', error);
    res.status(500).json({ success: false, message: 'Failed to store time slots' });
  }
};

exports.allAddedSlots =  async (req, res) => {
  try {


    // const { doctorId } = req.body;
    const { doctorId } = req.params;

    // Create a new slot document and save it to the database
    const dateObj = await Slot.find({doctorId}).select('date');
    const  dates=  dateObj.map((date)=>{
      console.log(date)
      return date?.date?.toISOString().split("T")[0];
    })

    res.status(201).json({ success: true, dates });
  } catch (error) {
    console.error('Error fetching time slots:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch the slots' });
  }
};



exports.bookAppointment =  async (req, res) => {
    try {
      const { doctorId, userId, date, timeslot, childName, age, reason, additionalDetails, timeslotId } = req.body;
  
      // Insert the appointment into the appointments table
      const appointment = await Appointment.create({
        doctorId,
        userId,
        date,
        timeslot,
        childName,
        age,
        reason,
        additionalDetails,
        timeslotId
      });
      // const updatedSlot = await Slot.findOneAndUpdate(
      //   { 'slots._id': timeslotId }, // Find slot with the given slotId
      //   { $set: { 'slots.$.status': 'Booked' } }, // Set the new status for the matched slot
      //   { new: true } // To return the updated slot
      // );
  
      // if (!updatedSlot) {
      //   // If slot with the given ID is not found
      //   console.log('Slot not found');
      //   return null; // Or throw an error if preferred
      // }
  
      res.status(201).json({ success: true, message: 'Slot booked successfully', appointment });
    } catch (error) {
      console.error('Error booking slot:', error);
      res.status(500).json({ success: false, message: 'Failed to book slot' });
    }
  };

  
  // GET endpoint for fetching available slots for a specific date and doctor
exports.availableSlots = async (req, res) => {
    try {

      const { doctorId, date } = req.body;
    console.log(doctorId, date, req.body);
 

      // Query the slots table to find available slots for the given date and doctor
      const slots = await Slot.findOne({ doctorId, date }).exec();
    //  console.log(slots);
      const appointments = await Appointment.find({ doctorId, date }).exec();
     
      const availableSlots = slots? slots.slots.filter(slot => {
        // Check if the slot is not booked (i.e., not present in appointments)
      
      //  console.log(!appointments.some(appointment => appointment.timeslot === slot.timeslot), slot.timeslot);
        return slot.status === "Available"
      }): [];
  
      console.log(appointments);
      res.status(200).json({ success: true, availableSlots });
    } catch (error) {
      console.error('Error fetching available slots:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch available slots' });
    }
  };

exports.updateAppointment =  async (req, res) => {
  const { id } = req.params;
  const { status, timeslotId } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if(status==="Booked"){
     const updatedSlot = await Slot.findOneAndUpdate(
        { 'slots._id': timeslotId }, // Find slot with the given slotId
        { $set: { 'slots.$.status': 'Booked' } }, // Set the new status for the matched slot
        { new: true } // To return the updated slot
      );
  
      if (!updatedSlot) {
        // If slot with the given ID is not found
        console.log('Slot not found');
        return null; // Or throw an error if preferred
      }
    }
    else if(status==="Cancelled"){
      const updatedSlot = await Slot.findOneAndUpdate(
        { 'slots._id': timeslotId }, // Find slot with the given slotId
        { $set: { 'slots.$.status': 'Available' } }, // Set the new status for the matched slot
        { new: true } // To return the updated slot
      );
  
      if (!updatedSlot) {
        // If slot with the given ID is not found
        console.log('Slot not found');
        return null; // Or throw an error if preferred
      }
    }

    if (updatedAppointment) {
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

  // Assuming you have already set up your Express app and imported necessary modules

 // Import the Appointment model

// Define a route to handle GET request for fetching appointments of a selected user
exports.userAppointments = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const d = new Date();
    const currentDate = moment(d.toISOString().split("T")[0]).toDate();
    // console.log(currentDate)
    // Fetch appointments associated with the selected user from the database
    const appointments = await Appointment.find({ userId, date: { $gte: currentDate } }).populate('doctorId').sort({ date: 1 });

    // Send the fetched appointments as a response
    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching appointments'
    });
  }
};

exports.doctorAppointments = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const d = new Date();
       const currentDate = moment(d.toISOString().split("T")[0]).toDate();
    // console.log(currentDate, d.toISOString().split("T")[0])
      // Fetch appointments associated with the selected user from the database
      const appointments = await Appointment.find({ doctorId, date: { $gte: currentDate   }}).populate('userId').sort({ date: 1 });
  
      // Send the fetched appointments as a response
      res.status(200).json({
        success: true,
        data: appointments
      });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error fetching appointments:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching appointments'
      });
    }
  };


  exports.dateWiseSlots = async(req, res)=>{
  
 
    try{
      const { doctorId, date } = req.params;
      console.log(doctorId, date);
      // Query the slots table to find available slots for the given date and doctor
      const slots = await Slot.findOne({ doctorId, date }).exec();
    //  console.log(slots);
    
    
      res.status(200).json({ success: true, slots });
    } catch (error) {
      console.error('Error fetching all created slots:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch slots' });
    }

  }

  