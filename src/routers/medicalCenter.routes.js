var express = require("express");
const {
  CreateMedicalCenter,
  SingleMedicalCenter,
  UpdateMedicalCenter,
  DeleteMedicalCenter,
  AllMedicalCenter,
} = require("../controllers/medicalCenterController");
const { authentication } = require("../utilities/auth");
const uploader = require("../utilities/uploader");
var router = express.Router();

router.post(
  "",
  // uploader.singleFileUpload.any({ name: "file" }),
  CreateMedicalCenter
);
router.patch("/:medicalCenterId",  UpdateMedicalCenter);
router.get("", AllMedicalCenter);
router.get("/:medicalCenterId", SingleMedicalCenter);
router.delete("/:medicalCenterId", DeleteMedicalCenter);
module.exports = router;
