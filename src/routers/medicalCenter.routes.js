var express = require("express");
const {
  CreateMedicalCenter,
  SingleMedicalCenter,
  UpdateMedicalCenter,
  DeleteMedicalCenter,
  AllMedicalCenter,
} = require("../controllers/medicalCenterController");
const { authentication } = require("../utilities/auth");
var router = express.Router();
const uploader = require("../utilities/uploader");
const config = require("../config/config");

router
  .route("")
  .post(
    uploader.uploadFileS3("multiple", config.dalilStorage_bucket),
    CreateMedicalCenter,
  );
router.patch("/:medicalCenterId", authentication,uploader.uploadFileS3("multiple", config.dalilStorage_bucket), UpdateMedicalCenter);
router.get("", AllMedicalCenter);
router.get("/:medicalCenterId",authentication, SingleMedicalCenter);
router.delete("/:medicalCenterId",authentication, DeleteMedicalCenter);
module.exports = router;
