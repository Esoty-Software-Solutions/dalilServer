var express = require("express");
var router = express.Router();
const { authentication } = require("../utilities/auth");
const medicalServicesController = require('../controllers/medicalServicesController');

router.get("/",authentication, medicalServicesController.getAllMedicalServices);
router.get("/:id",authentication, medicalServicesController.getMedicalService);
router.post("/", authentication,medicalServicesController.addMedicalService);
router.patch("/:id", authentication,medicalServicesController.updateMedicalService);
router.delete("/:id", authentication,medicalServicesController.deleteMedicalService);

module.exports = router;
