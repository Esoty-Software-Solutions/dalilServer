var express = require("express");
const {
  updateMedicalFile,
  createMedicalFile,
  getMedicalFiles,
} = require("../controllers/medicalFilesController");
const { authentication } = require("../utilities/auth");
const uploader = require("../utilities/uploader");
var router = express.Router();

router.post("/:beneficiaryId", authentication, createMedicalFile);
router.get("/", authentication, getMedicalFiles);
router.patch(
  "/:id",
  uploader.singleFileUpload.any({ name: "medicalFile" }),
  updateMedicalFile
);

module.exports = router;
