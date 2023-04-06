var express = require("express");
const initMedicalFilesController = require("../controllers/medicalFiles.controller");
const {
  createSubscriber,
  updateSubscriber,
  getSubscriber,
  deleteSubscriber,
  getSubscribers,
  createSubscribersCSV,
} = require("../controllers/subscriberController");
const { customValidation } = require("../middlewares/payloadValidation");
const { authentication } = require("../utilities/auth");
const uploader = require("../utilities/uploader");
const { clinicalVisitValidator, createMedicalFilesValidator, getMedicalFilesValidator, createSurgeryHistoryFilesValidator , createChronicDiseasesFilesValidator , createMedicalTestsValidator } = require("../validators/medicalFiles.validator");
var router = express.Router();
const {createClinicalVisitsController, getClinicalVisitsController, getAllergiesController, createAllergiesController , createSurgeryHistoriesController , getSurgeryHistoriesController , 
getChronicDiseasesController,createChronicDiseasesController , getMedicalTestsController
,createMedicalTestsController} = initMedicalFilesController();
router.post(
  "/uploadCSV",
  uploader.uploads.any({ name: "file" }),
  createSubscribersCSV
);
router.get("", authentication, getSubscribers);
router.post("", authentication, createSubscriber);
router.get("/:subscriberId", authentication, getSubscriber);
router.post(
  "/:subscriberId",
  authentication,
  // uploader.singleFileUpload.any({ name: "medicalFile" }),
  updateSubscriber
);
router.patch("/:subscriberId", authentication, updateSubscriber);
router.delete("/:subscriberId", authentication, deleteSubscriber);


// ---------------------------------------- medical files routes ----------------------------------------------- 
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/clinicalVisits`)
  .get(customValidation(getMedicalFilesValidator , "query"),authentication, getClinicalVisitsController )
  .post(customValidation(clinicalVisitValidator, "body"),authentication, createClinicalVisitsController )
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/allergies`)
  .get(customValidation(getMedicalFilesValidator , "query"),authentication,  getAllergiesController )
  .post(customValidation(createMedicalFilesValidator, "body"),authentication, createAllergiesController )
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/surgeryHistories`)
  .get(customValidation(getMedicalFilesValidator , "query"),authentication, getSurgeryHistoriesController )
  .post(customValidation(createSurgeryHistoryFilesValidator , "body"),authentication, createSurgeryHistoriesController )
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/chronicDiseases`)
  .get(customValidation(getMedicalFilesValidator , "query"),authentication, getChronicDiseasesController )
  .post(customValidation(createChronicDiseasesFilesValidator , "body"),authentication, createChronicDiseasesController )
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/medicalTests`)
  .get(customValidation(getMedicalFilesValidator , "query"),authentication, getMedicalTestsController )
  .post(customValidation(createMedicalTestsValidator , "body"),authentication, createMedicalTestsController )


// ---------------------------------------- Medical files routes -----------------------------------------------
module.exports = router;
