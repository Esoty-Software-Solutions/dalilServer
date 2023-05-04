var express = require("express");
const {
  AddPrescription,
  UpdatePrescription,
  DeletePrescription,
  PrescriptionById,
  AllPrescriptions,
} = require("../controllers/prescriptionController");
const { checkToken } = require("../utilities/tokenAuth");
const { authentication } = require("../utilities/auth");
var router = express.Router();
const uploader = require("../utilities/uploader");
const config = require("../config/config");

router.post("",authentication, uploader.uploadFileS3("multiple" , config.dalilStorage_bucket), AddPrescription);
router.patch("/:prescriptionId", authentication,UpdatePrescription);
router.get("", authentication,AllPrescriptions);
router.get("/:prescriptionId",authentication, PrescriptionById);
router.delete("/:prescriptionId",authentication, checkToken, DeletePrescription);


module.exports = router;
