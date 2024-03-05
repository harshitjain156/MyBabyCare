const express = require('express');
const {availableSlots, bookAppointment} = require("../controller/bookingController");
const router = express.Router();


// router.post("/sendotp", sendOtp);
router.post("/book-slot", bookAppointment);

router.get("/available-slots", availableSlots);


module.exports = router;
