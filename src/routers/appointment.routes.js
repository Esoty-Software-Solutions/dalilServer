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

router.get("",authentication, getAppointments);
router.get("/:appointmentId",  authentication,getAppointment);
router.post("/:appointmentId", authentication, updateAppointment);
router.patch("/:appointmentId", authentication, updateAppointment);
router.delete("/:appointmentId", authentication, deleteAppointment);

// router.get("/subscribers/:subscriberId", getUserAppointments);
module.exports = router;
