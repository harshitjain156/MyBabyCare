const express = require( 'express' );
const router = express.Router();
const {addNewChild, getAllChild} = require("../controller/childController");
// Require controller modules.
router.post("/add-new-child", addNewChild);
router.get("/all-child", getAllChild)

module.exports = router;