var express = require("express");
var router = express.Router();

const timeSlotEnumController = require('../controllers/timeSlotEnumController');

router.get("/", timeSlotEnumController.getAlltimeSlotEnum);
router.get("/:id", timeSlotEnumController.getTimeSlotEnum);
router.post("/", timeSlotEnumController.addTimeSlotEnum);
router.patch("/:id", timeSlotEnumController.updateTimeSlotEnum);
router.delete("/:id", timeSlotEnumController.deleteTimeSlotEnum);

module.exports = router;
