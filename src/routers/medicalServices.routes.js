var express = require("express");
var router = express.Router();

const medicalServicesController = require('../controllers/medicalServicesController');

router.get("/", medicalServicesController.getAllMedicalServices);
router.get("/:id", medicalServicesController.getMedicalService);
router.post("/", medicalServicesController.addMedicalService);
router.patch("/:id", medicalServicesController.updateMedicalService);
router.delete("/:id", medicalServicesController.deleteMedicalService);

module.exports = router;
