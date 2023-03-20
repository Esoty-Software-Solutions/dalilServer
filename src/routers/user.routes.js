import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  login,
  logout,
  RegisterAppToken,
  SendNotification,
  SendNotificationToUsers,
} from "../controllers/userController.js";
import { authentication } from "../utilities/auth.js";
var router = express.Router();

router.post("/login", login);
router.post("/logout", authentication, logout);

router.get("", getUsers);
router.post("", createUser);
// router.get("/:id", getUser);
router.post("/:id", updateUser);
router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);

router.post("/registerToken", authentication, RegisterAppToken);
router.post("/sendNotification", authentication, SendNotification);
router.post("/sendToAll", SendNotificationToUsers);
export default router;
