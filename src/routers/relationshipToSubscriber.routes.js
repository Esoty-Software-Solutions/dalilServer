var express = require("express");
var router = express.Router();

const relationshipToSubscriberController = require('../controllers/relationshipToSubscriberController');

router.get("/", relationshipToSubscriberController.getAllrelationshipToSubscriberEnum);
router.get("/:id", relationshipToSubscriberController.getrelationshipToSubscriberEnum);
router.post("/", relationshipToSubscriberController.addrelationshipToSubscriberEnum);
router.patch("/:id", relationshipToSubscriberController.updaterelationshipToSubscriberEnum);

module.exports = router;
