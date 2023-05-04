var express = require("express");
const {
  
  cookieVerification,
  isAdmin,
} = require(`../utilities/auth`);
const { authentication } = require("../utilities/auth");
const {
  CreateUserRole,
  GetAllRoles,
} = require("../controllers/userRoleController");
var router = express.Router();

router.post("", authentication, CreateUserRole);
router.get("", authentication, GetAllRoles);
module.exports = router;
