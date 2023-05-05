var express = require("express");
const {
  AddInstitution,
  UpdateInstitution,
  DeleteInstitution,
  InstitutionById,
  AllInstitutions,
} = require("../controllers/institutionController");
// const { checkToken } = require("../utilities/tokenAuth");
var router = express.Router();
const uploader = require("../utilities/uploader");
const config = require("../config/config");
const { authentication } = require("../utilities/auth");

router.post(
  "",
  uploader.uploadFileS3("multiple", config.dalilStorage_bucket),
  AddInstitution
);
router.patch("/:institutionId",authentication, UpdateInstitution);
router.get("", authentication,AllInstitutions);
router.get("/:institution_id", authentication,InstitutionById);
router.delete("/:institution_id",authentication, DeleteInstitution);
module.exports = router;
