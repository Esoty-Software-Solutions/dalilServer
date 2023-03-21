import express from "express";
import {
  CreateSchedule,
  UpdateSchedule,
  SpecificSchedule,
  DeleteSchedule,
  AllSchedule,
} from "../controllers/scheduleController.js";
import { authentication } from "../utilities/auth.js";
var router = express.Router();

router.post("", authentication, CreateSchedule);
router.patch("/:id", authentication, UpdateSchedule);
router.get("", AllSchedule);
router.get("/:id", authentication, SpecificSchedule);
router.delete("/:id", authentication, DeleteSchedule);
export default router;
