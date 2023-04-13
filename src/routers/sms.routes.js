var express = require("express");
const {
  CreateSms,
  UpdateSms,
  AllSms,
} = require("../controllers/smsController");
const { authentication } = require("../utilities/auth");
var router = express.Router();

router.post("",  CreateSms);
router.post("/processSMS/:id",  UpdateSms);
router.get("/getSMSqueue", AllSms);

module.exports = router;
