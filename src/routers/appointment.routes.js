var express = require("express");
const {
  createAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
  getAppointments,
  getUserAppointments,
} = require("../controllers/appointmentController");
const { authentication } = require("../utilities/auth");
var router = express.Router();

router.get("", getAppointments);
router.get("/:appointmentId",  getAppointment);
router.post("/:appointmentId",  updateAppointment);
router.patch("/:appointmentId",  updateAppointment);
router.delete("/:appointmentId",  deleteAppointment);
// router.get("/subscribers/:subscriberId", getUserAppointments);
module.exports = router;
