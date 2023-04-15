var express = require("express");
var router = express.Router();

const appointmentStatusEnumsController = require("../controllers/appointmentStatusEnumsController");

router.get("/", appointmentStatusEnumsController.getAllappointmentStatusEnums);
router.get("/:id", appointmentStatusEnumsController.getappointmentStatusEnums);
router.post("/", appointmentStatusEnumsController.addappointmentStatusEnums);
router.patch(
  "/:id",
  appointmentStatusEnumsController.updateappointmentStatusEnums,
);

module.exports = router;
