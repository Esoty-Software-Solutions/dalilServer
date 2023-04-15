var express = require("express");
const { login } = require("../controllers/userController");
const { customValidation } = require("../middlewares/payloadValidation");
const { loginValidator } = require("../validators/users.validator");
var router = express.Router();

router.route("").post(customValidation(loginValidator, "body"), login);

module.exports = router;
