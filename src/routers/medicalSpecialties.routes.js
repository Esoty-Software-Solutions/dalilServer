var express = require("express");
var router = express.Router();

const medicalSpecialtiesController = require('../controllers/medicalSpecialtiesController');

router.get("/", medicalSpecialtiesController.getAllMedicalSpecialties);
router.get("/:id", medicalSpecialtiesController.getMedicalSpecialty);
router.post("/", medicalSpecialtiesController.addMedicalSpecialty);
router.patch("/:id", medicalSpecialtiesController.updateMedicalSpecialty);
router.delete("/:id", medicalSpecialtiesController.deleteMedicalSpecialty);

module.exports = router;
