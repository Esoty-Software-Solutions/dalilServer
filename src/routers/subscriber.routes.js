var express = require("express");
const {
  createSubscriber,
  updateSubscriber,
  getSubscriber,
  deleteSubscriber,
  getSubscribers,
  createSubscribersCSV,
} = require("../controllers/subscriberController");
const { authentication } = require("../utilities/auth");
const uploader = require("../utilities/uploader");
var router = express.Router();

router.post("/uploadCSV", uploader.uploads.any({ name: "file" }), createSubscribersCSV);
router.get("", authentication, getSubscribers);
router.post("", authentication, createSubscriber);
router.get("/:subscriberId", authentication, getSubscriber);
router.post("/:subscriberId", authentication, updateSubscriber);
router.patch("/:subscriberId", authentication, updateSubscriber);
router.delete("/:subscriberId", authentication, deleteSubscriber);

module.exports = router;
