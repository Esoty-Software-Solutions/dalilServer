var express = require("express");
const {
  CreatePharmacy,
  SinglePharmacy,
  UpdatePharmacy,
  DeletePharmacy,
  AllPharmacy,
} = require("../controllers/pharmacyController");
const { authentication } = require("../utilities/auth");
var router = express.Router();
const uploader = require("../utilities/uploader");
const config = require("../config/config");
router.route("").post(uploader.uploadFileS3("multiple" , config.dalilStorage_bucket), CreatePharmacy);
router.patch("/:pharmacyId", authentication, UpdatePharmacy);
router.get("", AllPharmacy);
router.get("/:pharmacyId", SinglePharmacy);
router.delete("/:pharmacyId", DeletePharmacy);
module.exports = router;
