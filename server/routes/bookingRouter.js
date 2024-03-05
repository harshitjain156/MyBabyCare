const express = require('express');
const {availableSlots, bookAppointment, userAppointments, doctorAppointments} = require("../controller/bookingController");
const router = express.Router();


// router.post("/sendotp", sendOtp);
router.post("/book-slot", bookAppointment);

router.get("/available-slots", availableSlots);

router.get("/user-appointments/:userId", userAppointments);
router.get("/doctor-appointments/:doctorId", doctorAppointments);

module.exports = router;
