const express = require('express');
const {availableSlots, bookAppointment, userAppointments, doctorAppointments, createSlots, allAddedSlots, dateWiseSlots, updateAppointment, reScheduleAppointment} = require("../controller/bookingController");
const router = express.Router();


// router.post("/sendotp", sendOtp);
router.post("/book-slot", bookAppointment);

router.post("/available-slots", availableSlots);
router.post("/create-slots", createSlots)
router.get("/all-added-slots/:doctorId", allAddedSlots)
router.get("/slot-per-date/:doctorId/:date", dateWiseSlots)
router.put('/appointments/:id/status', updateAppointment);

router.get("/user-appointments/:userId", userAppointments);
router.get("/doctor-appointments/:doctorId", doctorAppointments);
router.patch('/reschedule/:id',reScheduleAppointment);

module.exports = router;
