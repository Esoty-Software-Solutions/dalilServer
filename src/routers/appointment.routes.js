import express from "express";
import {
  createAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
  getAppointments,
} from "../controllers/appointmentController.js";
import { authentication } from "../utilities/auth.js";
var router = express.Router();

router.get("", getAppointments);
router.post("", authentication, createAppointment);
router.get("/:appointmentId", authentication, getAppointment);
router.post("/:appointmentId", authentication, updateAppointment);
router.patch("/:appointmentId", authentication, updateAppointment);
router.delete("/:appointmentId", authentication, deleteAppointment);

export default router;
