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
router.get("", authentication,getSubscribers);
router.post("", authentication,createSubscriber);
router.get("/:subscriberId", authentication,getSubscriber);
router.get("/:subscriberId/beneficiaries", authentication,getBeneficiaries);
router.get("/:subscriberId/beneficiaries/:beneficiaryId", authentication,getBeneficiary);
router.patch("/:subscriberId/beneficiaries/:beneficiaryId", authentication,updateBeneficiary);
router.post(
  "/:subscriberId/beneficiaries",

  createBeneficiaryForSubscriber
);
router.patch("/:subscriberId",authentication, updateSubscriber);

// ---------------------------------------- just medical files router -----------------------------------------------

router
.route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles`)
.patch(customValidation(updateSimpleMedicalFilevalidator , "body") ,authentication, updateMedicalFileController)
.get(authentication,getMedicalFilesController)

// ---------------------------------------- just medical files router -----------------------------------------------

// ---------------------------------------- medical files routes -----------------------------------------------
router
  .route(
    `/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/clinicalVisits`
  )
  .get(authentication,
    customValidation(getMedicalFilesValidator, "query"),
    getClinicalVisitsController
  )
  .post(authentication,
    uploader.uploadFileS3("single", config.aws_bucketName),
    customValidation(clinicalVisitValidator, "body"),
    createClinicalVisitsController
  );
router
  .route(`/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/allergies`)
  .get(authentication,
    customValidation(getMedicalFilesValidator, "query"),
    getAllergiesController
  )
  .post(authentication,
    uploader.uploadFileS3("single", config.aws_bucketName),
    customValidation(createMedicalFilesValidator, "body"),
    createAllergiesController
  );
router
  .route(
    `/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/surgeryHistories`
  )
  .get(authentication,
    customValidation(getMedicalFilesValidator, "query"),
    getSurgeryHistoriesController
  )
  .post(authentication,
    uploader.uploadFileS3("single", config.aws_bucketName),
    customValidation(createSurgeryHistoryFilesValidator, "body"),
    createSurgeryHistoriesController
  );
router
  .route(
    `/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/chronicDiseases`
  )
  .get(authentication,
    customValidation(getMedicalFilesValidator, "query"),
    getChronicDiseasesController
  )
  .post(authentication,
    uploader.uploadFileS3("single", config.aws_bucketName),
    customValidation(createChronicDiseasesFilesValidator, "body"),
    createChronicDiseasesController
  );
router
  .route(
    `/:subscriberId/beneficiaries/:beneficiaryId/medicalFiles/medicalTests`
  )
  .get(authentication,
    customValidation(getMedicalFilesValidator, "query"),
    getMedicalTestsController
  )
  .post(authentication,
    uploader.uploadFileS3("single", config.aws_bucketName),
    customValidation(createMedicalTestsValidator, "body"),
    createMedicalTestsController
  );

// ---------------------------------------- Medical files routes -----------------------------------------------

// csv parse route
router.route(`/csv-parse`).post(authentication,upload.single("buffer") , csvParseController);


// requesting an appointment
router.post("/:subscriberId/appointments",authentication, createAppointment);

// list all appointment for a user
router.get("/:subscriberId/appointments",authentication, getUserAppointments);



module.exports = router;
