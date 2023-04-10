var express = require("express");
const {
  CreateSchedule,
  UpdateSchedule,
  SpecificSchedule,
  DeleteSchedule,
  AllSchedule,
} = require("../controllers/scheduleController");
const { authentication } = require("../utilities/auth");
var router = express.Router();

router.post("", CreateSchedule);
router.patch("/:scheduleId", UpdateSchedule);
router.get("", AllSchedule);
router.get("/:scheduleId", SpecificSchedule);
router.delete("/:scheduleId", DeleteSchedule);
module.exports = router;
