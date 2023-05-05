var express = require("express");
var router = express.Router();
const { authentication } = require("../utilities/auth");
const medicalSpecialtiesController = require('../controllers/medicalSpecialtiesController');

router.get("/",authentication, medicalSpecialtiesController.getAllMedicalSpecialties);
router.get("/:id", authentication,medicalSpecialtiesController.getMedicalSpecialty);
router.post("/", authentication,medicalSpecialtiesController.addMedicalSpecialty);
router.patch("/:id",authentication, medicalSpecialtiesController.updateMedicalSpecialty);
router.delete("/:id", authentication,medicalSpecialtiesController.deleteMedicalSpecialty);

module.exports = router;
