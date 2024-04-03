const express = require("express");
const app = express();
const mongoose = require("mongoose");
const socket = require("socket.io");
const http = require("http");

const Appointment  = require("../server/model/appointmentSchema");
const Slot = require("../server/model/slotModel")

const connectDB = require("./db/connect");
const dietPlannerRoutes=require("../server/routes/dietPlannerRoutes");
const authRoutes = require("../server/routes/authRouter");
const doctorRoutes = require("../server/routes/doctorRouter");
const bookingRoutes = require("../server/routes/bookingRouter");
const childRoutes = require("../server/routes/childRouter");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./error")

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
};

app.use(cors(corsOptions));
require("dotenv").config();

const server = http.createServer(app); // Removed the second argument for options
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
let users = {};

io.on("connect", (socket) => {
  console.log('a user connected', socket.id);

  socket.on("init", () => {
    // Store the user's ID in the users object
    users[socket.id] = {
      id: socket.id,
    
    };
    console.log(socket.id)
    // Emit the user's ID back to the client
    socket.emit("initResponse", socket.id);
  });

  socket.on("message", (message) => {
    console.log(message);
    // Broadcast the message to all users in the same room
    io.to("abcd").emit("message", { sender: socket.id, message });
  });

  socket.on("joinRoom", () => {
    // Join the specified room
    socket.join("abcd");
    // Store the room ID with the user
    // users[socket.id].room = roomId;
  });

  socket.on("disconnect", () => {
    // Remove the user from all rooms upon disconnection
    // for (const userId in users) {
    //   if (users[userId].room === users[socket.id].room) {
    //     delete users[userId].room;
    //   }
    // }
  });
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});

app.use("/api/v1", authRoutes);
app.use("/api/v1", doctorRoutes)

app.use("/api/v1", bookingRoutes)
app.use("/api/v1", childRoutes)
app.use("/api/v1/dietplanner", dietPlannerRoutes);

app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: API_ENDPOINT_NOT_FOUND_ERR,
  };
  next(error);
});

// global error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || SERVER_ERR;
  const data = err.data || null;
  res.status(status).json({
    type: "error",
    message,
    data,
  });
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);


//////////////////////////////

// const appointmentsData = [
// //   {
// //     doctorId: '610ab69b4a8763f106d58997', // Replace with actual doctor ID
// //     userId: '610ab69b4a8763f106d58998', // Replace with actual patient ID
// //     date: new Date('2024-09-19'),
// //     timeslot: '9:00 AM - 10:00 AM',
// //     childName: 'John Doe',
// //     age: 5,
// //     reason: 'Regular checkup',
// //     additionalDetails: 'No special instructions'
// //   },
// //   // Add more appointments as needed
// // ];

// Create dummy data for slots
// const slotsData = [
//   {
//     doctorId: '65e6ab3ffe25f8b26639ec66', // Replace with actual doctor ID
//     week: {
//       Monday: [{ timeslot: '9:00 AM - 10:00 AM' }, { timeslot: '10:00 AM - 11:00 AM' }, /* Add more slots for Monday */],
//       Tuesday: [{ timeslot: '9:00 AM - 10:00 AM' }, { timeslot: '10:00 AM - 11:00 AM' }, /* Add more slots for Tuesday */],
//       // Add slots for other days of the week as needed
//     }
//   },
//   // Add more slots as needed
// ];


// // Insert dummy appointments into the database
// // Appointment.insertMany(appointmentsData)
// //   .then(() => console.log('Dummy appointments inserted successfully'))
// //   .catch(err => console.error('Error inserting dummy appointments:', err));

// // Insert dummy slots into the database
// // Slot.insertMany(slotsData)
// //   .then(() => console.log('Dummy slots inserted successfully'))
// //   .catch(err => console.error('Error inserting dummy slots:', err));

// const createDummySlots = async () => {
//   try {
//     // Dummy data for Monday
//     const mondaySlots = [
//       { timeslot: '9:00 AM - 10:00 AM' },
//       { timeslot: '10:00 AM - 11:00 AM' },
//       { timeslot: '11:00 AM - 12:00 AM' },
//       { timeslot: '01:00 AM - 02:00 AM' }
//     ];
    
//     const tuesdaySlots = [
//       { timeslot: '9:00 AM - 10:00 AM' },
//       { timeslot: '10:00 AM - 11:00 AM' }
//     ];
    
//     const wednesdaySlots = [
//       { timeslot: '9:00 AM - 10:00 AM' },
//       { timeslot: '10:00 AM - 11:00 AM' },
//       { timeslot: '11:00 AM - 12:00 PM' },
//       { timeslot: '01:00 PM - 02:00 PM' }
//     ];
    
//     const thursdaySlots = [
//       { timeslot: '9:00 AM - 10:00 AM' },
//       { timeslot: '10:00 AM - 11:00 AM' }
//     ];
    
//     const fridaySlots = [
//       { timeslot: '9:00 AM - 10:00 AM' },
//       { timeslot: '10:00 AM - 11:00 AM' },
//       { timeslot: '11:00 AM - 12:00 PM' },
//       { timeslot: '01:00 PM - 02:00 PM' }
//     ];
    
//     const saturdaySlots = [
//       { timeslot: '9:00 AM - 10:00 AM' },
//       { timeslot: '10:00 AM - 11:00 AM' }
//     ];

//     const sundaySlots = [
      
//     ];
    
//     // Create a new slot document
//     const slot = new Slot({
//       doctorId: '65e6ab3ffe25f8b26639ec66',
//       week: new Map([
//         ['Monday', { day: 'Monday', slots: mondaySlots }],
//         ['Tuesday', { day: 'Tuesday', slots: tuesdaySlots }],
//         ['Wednesday', { day: 'Wednesday', slots: wednesdaySlots }],
//         ['Thursday', { day: 'Thursday', slots: thursdaySlots }],
//         ['Friday', { day: 'Friday', slots: fridaySlots }],
//         ['Saturday', { day: 'Saturday', slots: saturdaySlots }],
//         ['Sunday', { day: 'Sunday', slots: sundaySlots }]
//       ])
//     });    

//     // Save the slot document
//     await slot.save();
//     console.log('Dummy slots created successfully');
//   } catch (error) {
//     console.error('Error creating dummy slots:', error);
//   }
// };

// createDummySlots();



////////////////////////////////



    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
