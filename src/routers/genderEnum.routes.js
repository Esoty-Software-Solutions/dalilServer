var express = require("express");
var router = express.Router();

const genderEnumController = require("../controllers/genderEnum");

router.get("/", genderEnumController.getAllgenderEnum);
router.get("/:id", genderEnumController.getgenderEnum);
router.post("/", genderEnumController.addgenderEnum);
router.patch("/:id", genderEnumController.updategenderEnum);

module.exports = router;
