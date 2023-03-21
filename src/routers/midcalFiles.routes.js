import express from "express";
import {
  updateMedicalFile,
  createMedicalFile,
  getMedicalFiles,
} from "../controllers/medicalFilesController.js";
import { authentication } from "../utilities/auth.js";
import uploader from "../utilities/uploader.js";
var router = express.Router();

router.post("/:beneficiaryId", authentication, createMedicalFile);
router.get("/", authentication, getMedicalFiles);
router.post(
  "/update/:id",
  uploader.singleFileUpload.any({ name: "medicalFile" }),
  updateMedicalFile
);

export default router;
