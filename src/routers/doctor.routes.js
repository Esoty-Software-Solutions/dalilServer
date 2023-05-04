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

router.post("", authentication,CreateDoctor);
router.patch("/:doctorId", authentication,UpdateDoctor);
router.get("",authentication, AllDoctors);
router.get("/:doctorId",authentication, GetDoctor);
router.delete("/:doctorId", authentication,DeleteDoctor);
module.exports = router;
