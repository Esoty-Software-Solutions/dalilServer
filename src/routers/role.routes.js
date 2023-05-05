var express = require("express");
const {
  getAllRole
 
} = require("../controllers/roleController");
const { authentication } = require("../utilities/auth");
var router = express.Router();

router.get("", getAllRole);


module.exports = router;
