var express = require("express");
const {
  CreateMedicalCenter,
  SingleMedicalCenter,
  UpdateMedicalCenter,
  DeleteMedicalCenter,
  AllMedicalCenter,
} = require("../controllers/medicalCenterController");
const { checkToken } = require("../utilities/tokenAuth");
var router = express.Router();

router.post("", CreateMedicalCenter);
router.patch("/:medicalCenterId", checkToken, UpdateMedicalCenter);
router.get("", AllMedicalCenter);
router.get("/:id", checkToken, SingleMedicalCenter);
router.delete("/:medicalCenterId", checkToken, DeleteMedicalCenter);
module.exports = router;
