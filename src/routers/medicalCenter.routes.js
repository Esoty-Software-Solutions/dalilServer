import express from "express";
import {
  CreateMedicalCenter,
  SingleMedicalCenter,
  UpdateMedicalCenter,
  DeleteMedicalCenter,
  AllMedicalCenter,
} from "../controllers/medicalCenterController.js";
import { authentication } from "../utilities/auth.js";
var router = express.Router();

router.post("", authentication, CreateMedicalCenter);
router.patch("/:medicalCenterId", authentication, UpdateMedicalCenter);
router.get("", AllMedicalCenter);
router.get("/:id", authentication, SingleMedicalCenter);
router.delete("/:medicalCenterId", authentication, DeleteMedicalCenter);
export default router;
