var express = require("express");
var router = express.Router();
const { authentication } = require("../utilities/auth");
const genderEnumController = require("../controllers/genderEnumController");

router.get("/", authentication,genderEnumController.getAllgenderEnum);
router.get("/:id", authentication, genderEnumController.getgenderEnum);
router.post("/",  authentication,genderEnumController.addgenderEnum);
router.patch("/:id",  authentication,genderEnumController.updategenderEnum);
router.delete("/:id", authentication, genderEnumController.deletegenderEnum);

module.exports = router;
