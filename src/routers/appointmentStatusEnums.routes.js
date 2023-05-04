var express = require("express");
var router = express.Router();
const { authentication } = require("../utilities/auth");
const appointmentStatusEnumsController = require('../controllers/appointmentStatusEnumsController');

router.get("/",authentication, appointmentStatusEnumsController.getAllappointmentStatusEnums);
router.get("/:id", authentication,appointmentStatusEnumsController.getappointmentStatusEnums);
router.post("/",authentication, appointmentStatusEnumsController.addappointmentStatusEnums);
router.patch("/:id", authentication,appointmentStatusEnumsController.updateappointmentStatusEnums);
router.delete("/:id", authentication,appointmentStatusEnumsController.deleteappointmentStatusEnums);

module.exports = router;
