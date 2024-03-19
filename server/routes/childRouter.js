const express = require( 'express' );
const router = express.Router();
const {addNewChild, getAllChild, deleteChild} = require("../controller/childController");
// Require controller modules.
router.post("/add-new-child", addNewChild);
router.get("/all-child", getAllChild);
router.delete("/delete/:id", deleteChild)

module.exports = router;