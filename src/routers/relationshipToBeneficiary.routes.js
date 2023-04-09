var express = require("express");
var router = express.Router();

const relationshipToBeneficiaryController = require('../controllers/relationshipToBeneficiaryController');

router.get("/", relationshipToBeneficiaryController.getAllrelationshipToSubscriberEnum);
router.get("/:id", relationshipToBeneficiaryController.getrelationshipToSubscriberEnum);
router.post("/", relationshipToBeneficiaryController.addrelationshipToSubscriberEnum);
router.patch("/:id", relationshipToBeneficiaryController.updaterelationshipToSubscriberEnum);

module.exports = router;
