var express = require("express");
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
const { authentication } = require("../utilities/auth");
const uploader = require("../utilities/uploader");
var router = express.Router();

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

module.exports = router;
