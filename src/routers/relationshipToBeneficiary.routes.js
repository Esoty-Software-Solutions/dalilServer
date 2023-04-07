var express = require("express");
var router = express.Router();

const relationshipToBeneficiaryController = require('../controllers/relationshipToBeneficiaryController');

router.get("/", relationshipToBeneficiaryController.getAllRelationshipToBeneficiaryEnum);
router.get("/:id", relationshipToBeneficiaryController.getRelationshipToBeneficiaryEnum);
router.post("/", relationshipToBeneficiaryController.addRelationshipToBeneficiaryEnum);
router.patch("/:id", relationshipToBeneficiaryController.updateRelationshipToBeneficiaryEnum);

module.exports = router;
