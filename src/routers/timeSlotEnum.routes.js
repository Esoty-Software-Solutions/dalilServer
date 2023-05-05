var express = require("express");
var router = express.Router();
const { authentication } = require("../utilities/auth");
const timeSlotEnumController = require('../controllers/timeSlotEnumController');

router.get("/", authentication,timeSlotEnumController.getAlltimeSlotEnum);
router.get("/:id",authentication, timeSlotEnumController.getTimeSlotEnum);
router.post("/",authentication, timeSlotEnumController.addTimeSlotEnum);
router.patch("/:id", authentication,timeSlotEnumController.updateTimeSlotEnum);
router.delete("/:id",authentication, timeSlotEnumController.deleteTimeSlotEnum);

module.exports = router;
