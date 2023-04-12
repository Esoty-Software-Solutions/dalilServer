var express = require("express");
const {
  AddPrescription,
  UpdatePrescription,
  DeletePrescription,
  PrescriptionById,
  AllPrescriptions,
} = require("../controllers/prescriptionController");
const { checkToken } = require("../utilities/tokenAuth");
var router = express.Router();
const uploader = require("../utilities/uploader");
const config = require("../config/config");

router.post("", uploader.uploadFileS3("multiple" , config.dalilStorage_bucket), AddPrescription);
router.patch("/:prescriptionId", checkToken, UpdatePrescription);
router.get("", AllPrescriptions);
router.get("/:prescriptionId", PrescriptionById);
router.delete("/:prescriptionId", checkToken, DeletePrescription);


module.exports = router;
