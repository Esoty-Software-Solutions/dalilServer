var express = require("express");
const {
  AddInstitution,
  UpdateInstitution,
  DeleteInstitution,
  InstitutionById,
  AllInstitutions,
} = require("../controllers/institutionController");
const { checkToken } = require("../utilities/tokenAuth");
var router = express.Router();
const uploader = require("../utilities/uploader");
const config = require("../config/config");

router.post("", uploader.uploadFileS3("multiple" , config.dalilStorage_bucket), AddInstitution);
router.patch("/:institutionId", checkToken, UpdateInstitution);
router.get("", AllInstitutions);
router.get("/:institution_id", InstitutionById);
router.delete("/:institution_id", checkToken, DeleteInstitution);
module.exports = router;
