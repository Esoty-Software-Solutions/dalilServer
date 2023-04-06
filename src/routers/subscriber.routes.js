var express = require("express");
const initMedicalFilesController = require("../controllers/medicalFiles.controller");
const {
  createSubscriber,
  updateSubscriber,
  getSubscriber,
  getSubscribers,
  createSubscribersCSV,
  getBeneficiaries,
  createBeneficiaryForSubscriber,
  getBeneficiary,
  updateBeneficiary,
} = require("../controllers/subscriberController");
const { customValidation } = require("../middlewares/payloadValidation");
const { authentication } = require("../utilities/auth");
const uploader = require("../utilities/uploader");
const { clinicalVisitValidator } = require("../validators/medicalFiles.validator");
var router = express.Router();
const {createClinicalVisitsController, getClinicalVisitsController} = initMedicalFilesController();
router.post(
  "/uploadCSV",
  uploader.uploads.any({ name: "file" }),
  createSubscribersCSV
);
router.get("", authentication, getSubscribers);
router.post("", authentication, createSubscriber);
router.get("/:subscriberId", authentication, getSubscriber);
router.get("/:subscriberId/beneficiaries", authentication, getBeneficiaries);
router.get("/:subscriberId/beneficiaries/:beneficiaryId", getBeneficiary);
router.patch("/:subscriberId/beneficiaries/:beneficiaryId", updateBeneficiary);
router.post(
  "/:subscriberId/beneficiaries",
  authentication,
  createBeneficiaryForSubscriber
);
router.patch("/:subscriberId", authentication, updateSubscriber);


// ---------------------------------------- medical files routes ----------------------------------------------- 
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/clinicalVisits`)
  .get(authentication , getClinicalVisitsController )
  .post(customValidation(clinicalVisitValidator, "body") , createClinicalVisitsController )
// router
//   .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/allergies`)
//   .get(authentication , getAllergiesController )
//   .post(authentication , createAllergiesController )
// router
//   .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/surgeryHistories`)
//   .get(authentication , getSurgeryHistoriesController )
//   .post(authentication , createSurgeryHistoriesController )
// router
//   .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/chronicDiseases`)
//   .get(authentication , getChronicDiseasesController )
//   .post(authentication , createChronicDiseasesController )
// router
//   .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/medicalTests`)
//   .get(authentication , getMedicalTestsController )
//   .post(authentication , createMedicalTestsController )


// ---------------------------------------- Medical files routes -----------------------------------------------
module.exports = router;
