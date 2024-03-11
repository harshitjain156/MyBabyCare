const express = require('express');
const {availableSlots, bookAppointment, userAppointments, doctorAppointments, createSlots, allAddedSlots} = require("../controller/bookingController");
const router = express.Router();


// router.post("/sendotp", sendOtp);
router.post("/book-slot", bookAppointment);

router.post("/available-slots", availableSlots);
router.post("/create-slots", createSlots)
router.get("/all-added-slots/:doctorId", allAddedSlots)

router.get("/user-appointments/:userId", userAppointments);
router.get("/doctor-appointments/:doctorId", doctorAppointments);

module.exports = router;
