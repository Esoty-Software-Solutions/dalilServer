var express = require("express");
const {
  createAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
  getAppointments,
} = require("../controllers/appointmentController");
const { authentication } = require("../utilities/auth");
var router = express.Router();

router.get("", getAppointments);
router.post("", authentication, createAppointment);
router.get("/:appointmentId", authentication, getAppointment);
router.post("/:appointmentId", authentication, updateAppointment);
router.patch("/:appointmentId", authentication, updateAppointment);
router.delete("/:appointmentId", authentication, deleteAppointment);

module.exports = router;
