var express = require("express");
const {
  CreateDoctor,
  GetDoctor,
  UpdateDoctor,
  DeleteDoctor,
  AllDoctors,
} = require("../controllers/doctorController");
const { authentication } = require("../utilities/auth");
var router = express.Router();

router.post("", CreateDoctor);
router.patch("/:doctorId", UpdateDoctor);
router.get("", AllDoctors);
router.get("/:doctorId", GetDoctor);
router.delete("/:doctorId", DeleteDoctor);
module.exports = router;
