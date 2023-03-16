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

router.post("", authentication, CreateMedicalCenter);
router.patch("/:medicalCenterId", authentication, UpdateMedicalCenter);
router.get("", AllMedicalCenter);
router.get("/:id", authentication, SingleMedicalCenter);
router.delete("/:medicalCenterId", authentication, DeleteMedicalCenter);
module.exports = router;
