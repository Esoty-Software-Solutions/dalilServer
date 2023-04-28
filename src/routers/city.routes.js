var express = require("express");
var router = express.Router();

const cityController = require("../controllers/cityController");

router.get("/", cityController.getAllCity);
router.get("/:id", cityController.getCity);
router.post("/", cityController.addCity);
router.patch("/:id", cityController.updateCity);
router.delete("/:id", cityController.deleteCity);

module.exports = router;
