var express = require("express");
var router = express.Router();
const { authentication } = require("../utilities/auth");
const relationshipToSubscriberController = require('../controllers/relationshipToSubscriberController');

router.get("/", authentication,relationshipToSubscriberController.getAllrelationshipToSubscriberEnum);
router.get("/:id", authentication,relationshipToSubscriberController.getrelationshipToSubscriberEnum);
router.post("/", authentication,relationshipToSubscriberController.addrelationshipToSubscriberEnum);
router.patch("/:id", authentication,relationshipToSubscriberController.updaterelationshipToSubscriberEnum);
router.delete("/:id", authentication,relationshipToSubscriberController.deleterelationshipToSubscriberEnum);
module.exports = router;
