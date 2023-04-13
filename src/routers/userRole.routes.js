var express = require("express");
const {
  
  cookieVerification,
  isAdmin,
} = require(`../utilities/auth`);
const {
  CreateUserRole,
  GetAllRoles,
} = require("../controllers/userRoleController");
var router = express.Router();

router.post("",  CreateUserRole);
router.get("", GetAllRoles);
module.exports = router;
