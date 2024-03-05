const express = require('express');
const {allDoctors} = require("../controller/doctorController")

const router = express.Router();


router.get("/doctors", allDoctors);

module.exports = router;
