var express = require("express");
var router = express.Router();
const { authentication } = require("../utilities/auth");
const cityController = require("../controllers/cityController");

router.get("/", authentication,cityController.getAllCity);
router.get("/:id",authentication, cityController.getCity);
router.post("/", authentication,cityController.addCity);
router.patch("/:id",authentication, cityController.updateCity);
router.delete("/:id", authentication,cityController.deleteCity);

module.exports = router;
