var express = require("express");
var router = express.Router();

const appointmentStatusEnumsController = require('../controllers/appointmentStatusEnumsController');

router.get("/", appointmentStatusEnumsController.getAllAppointmentStatusEnums);
router.get("/:id", appointmentStatusEnumsController.getAppointmentStatusEnums);
router.post("/", appointmentStatusEnumsController.addAppointmentStatusEnums);
router.patch("/:id", appointmentStatusEnumsController.updateAppointmentStatusEnums);

module.exports = router;
