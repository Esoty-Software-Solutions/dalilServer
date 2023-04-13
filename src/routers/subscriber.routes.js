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
const { clinicalVisitValidator, createMedicalFilesValidator, getMedicalFilesValidator, createSurgeryHistoryFilesValidator , createChronicDiseasesFilesValidator , createMedicalTestsValidator } = require("../validators/medicalFiles.validator");
var router = express.Router();
const {createClinicalVisitsController, getClinicalVisitsController, getAllergiesController, createAllergiesController , createSurgeryHistoriesController , getSurgeryHistoriesController , 
getChronicDiseasesController,createChronicDiseasesController , getMedicalTestsController
,createMedicalTestsController} = initMedicalFilesController();
// router.post(
//   "/uploadCSV",
//   uploader.uploads.any({ name: "file" }),
//   createSubscribersCSV
// );
router.get("",  getSubscribers);
router.post("",  createSubscriber);
router.get("/:subscriberId",  getSubscriber);
router.get("/:subscriberId/beneficiaries",  getBeneficiaries);
router.get("/:subscriberId/beneficiaries/:beneficiaryId", getBeneficiary);
router.patch("/:subscriberId/beneficiaries/:beneficiaryId", updateBeneficiary);
router.post(
  "/:subscriberId/beneficiaries",
  
  createBeneficiaryForSubscriber
);
router.patch("/:subscriberId",  updateSubscriber);


// ---------------------------------------- medical files routes ----------------------------------------------- 
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/clinicalVisits`)
  .get(customValidation(getMedicalFilesValidator , "query"), getClinicalVisitsController )
  .post(uploader.uploadFileS3.single("file"),customValidation(clinicalVisitValidator, "body"), createClinicalVisitsController )
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/allergies`)
  .get(customValidation(getMedicalFilesValidator , "query"),  getAllergiesController )
  .post(uploader.uploadFileS3.single("file"),customValidation(createMedicalFilesValidator, "body"), createAllergiesController )
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/surgeryHistories`)
  .get(customValidation(getMedicalFilesValidator , "query"), getSurgeryHistoriesController )
  .post(uploader.uploadFileS3.single("file"),customValidation(createSurgeryHistoryFilesValidator , "body"), createSurgeryHistoriesController )
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/chronicDiseases`)
  .get(customValidation(getMedicalFilesValidator , "query"), getChronicDiseasesController )
  .post(uploader.uploadFileS3.single("file"),customValidation(createChronicDiseasesFilesValidator , "body"), createChronicDiseasesController )
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/medicalTests`)
  .get(customValidation(getMedicalFilesValidator , "query"), getMedicalTestsController )
  .post(uploader.uploadFileS3.single("file"),customValidation(createMedicalTestsValidator , "body"), createMedicalTestsController )


// ---------------------------------------- Medical files routes -----------------------------------------------
module.exports = router;
