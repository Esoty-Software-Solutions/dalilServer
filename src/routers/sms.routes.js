var express = require("express");
const {
  CreateSms,
  UpdateSms,
  AllSms,
} = require("../controllers/smsController");
const { authentication } = require("../utilities/auth");
var router = express.Router();

router.post("", authentication, CreateSms);
router.post("/processSMS/:id", authentication, UpdateSms);
router.get("/getSMSqueue", AllSms);

module.exports = router;
