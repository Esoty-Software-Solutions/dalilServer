var express = require("express");
const multer = require('multer');
const upload = multer();
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
const {
  clinicalVisitValidator,
  createMedicalFilesValidator,
  getMedicalFilesValidator,
  createSurgeryHistoryFilesValidator,
  createChronicDiseasesFilesValidator,
  createMedicalTestsValidator,
  updateSimpleMedicalFilevalidator,
} = require("../validators/medicalFiles.validator");
const config = require("../config/config");
const { createAppointment, getUserAppointments } = require("../controllers/appointmentController");
var router = express.Router();
const {
  createClinicalVisitsController,
  getClinicalVisitsController,
  getAllergiesController,
  createAllergiesController,
  createSurgeryHistoriesController,
  getSurgeryHistoriesController,
  getChronicDiseasesController,
  createChronicDiseasesController,
  getMedicalTestsController,
  createMedicalTestsController,
  updateMedicalFileController,
  getMedicalFilesController,
  csvParseController
} = initMedicalFilesController();
// router.post(
//   "/uploadCSV",
//   uploader.uploads.any({ name: "file" }),
//   createSubscribersCSV
// );
router.get("", getSubscribers);
router.post("", createSubscriber);
router.get("/:subscriberId", getSubscriber);
router.get("/:subscriberId/beneficiaries", getBeneficiaries);
router.get("/:subscriberId/beneficiaries/:beneficiaryId", getBeneficiary);
router.patch("/:subscriberId/beneficiaries/:beneficiaryId", updateBeneficiary);
router.post(
  "/:subscriberId/beneficiaries",

  createBeneficiaryForSubscriber
);
router.patch("/:subscriberId", updateSubscriber);

// ---------------------------------------- just medical files router -----------------------------------------------

router
.route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles`)
.patch(customValidation(updateSimpleMedicalFilevalidator , "body") , updateMedicalFileController)
.get(getMedicalFilesController)

// ---------------------------------------- just medical files router -----------------------------------------------

// ---------------------------------------- medical files routes -----------------------------------------------
router
  .route(
    `/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/clinicalVisits`
  )
  .get(
    customValidation(getMedicalFilesValidator, "query"),
    getClinicalVisitsController
  )
  .post(
    uploader.uploadFileS3("single", config.aws_bucketName),
    customValidation(clinicalVisitValidator, "body"),
    createClinicalVisitsController
  );
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/allergies`)
  .get(
    customValidation(getMedicalFilesValidator, "query"),
    getAllergiesController
  )
  .post(
    uploader.uploadFileS3("single", config.aws_bucketName),
    customValidation(createMedicalFilesValidator, "body"),
    createAllergiesController
  );
router
  .route(
    `/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/surgeryHistories`
  )
  .get(
    customValidation(getMedicalFilesValidator, "query"),
    getSurgeryHistoriesController
  )
  .post(
    uploader.uploadFileS3("single", config.aws_bucketName),
    customValidation(createSurgeryHistoryFilesValidator, "body"),
    createSurgeryHistoriesController
  );
router
  .route(
    `/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/chronicDiseases`
  )
  .get(
    customValidation(getMedicalFilesValidator, "query"),
    getChronicDiseasesController
  )
  .post(
    uploader.uploadFileS3("single", config.aws_bucketName),
    customValidation(createChronicDiseasesFilesValidator, "body"),
    createChronicDiseasesController
  );
router
  .route(
    `/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/medicalTests`
  )
  .get(
    customValidation(getMedicalFilesValidator, "query"),
    getMedicalTestsController
  )
  .post(
    uploader.uploadFileS3("single", config.aws_bucketName),
    customValidation(createMedicalTestsValidator, "body"),
    createMedicalTestsController
  );

// ---------------------------------------- Medical files routes -----------------------------------------------

// csv parse route
router.route(`/csv-parse`).post(upload.single("buffer") , csvParseController);


// requesting an appointment
router.post("/:subscriberId/appointments", createAppointment);

// list all appointment for a user
router.get("/:subscriberId/appointments", getUserAppointments);



module.exports = router;
