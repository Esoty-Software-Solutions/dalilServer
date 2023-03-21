import express from "express";
import {
  createSubscriber,
  updateSubscriber,
  getSubscriber,
  deleteSubscriber,
  getSubscribers,
  createSubscribersCSV,
} from "../controllers/subscriberController.js";
import { authentication } from "../utilities/auth.js";
import uploader from "../utilities/uploader.js";
var router = express.Router();

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

export default router;
