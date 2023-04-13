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

router.post("", AddInstitution);
router.patch("/:institutionId", UpdateInstitution);
router.get("", AllInstitutions);
router.get("/:id", InstitutionById);
router.delete("/:id", DeleteInstitution);
module.exports = router;
