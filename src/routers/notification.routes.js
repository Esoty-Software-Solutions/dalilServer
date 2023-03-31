var express = require("express");
const notification = require("../controllers/notificationController");
const { checkToken } = require("../utilities/tokenAuth");
var router = express.Router();

router.post("", notification.SendNotificationOnSingleDevice);

module.exports = router;