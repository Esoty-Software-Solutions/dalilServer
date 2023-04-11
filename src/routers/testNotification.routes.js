var express = require("express");
const notification = require("../controllers/notificationController");
const { customValidation } = require("../middlewares/payloadValidation");
const { testNotificationValidator } = require("../validators/Notifications.validator");

var router = express.Router();

router.post("/", customValidation(testNotificationValidator, "body") ,notification.SendNotificationOnSingleDevice);

module.exports = router;
