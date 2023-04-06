var express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  login,
  logout,
  RegisterAppToken,
  SendNotification,
  SendNotificationToUsers,
  ChangePassword,
  getUserById,
  UpdateDeviceToken,
} = require("../controllers/userController");
const { checkToken } = require("../utilities/tokenAuth");
var router = express.Router();

router.post("/login", login);
// router.post("/logout", checkToken, logout);
router.post("/logout", logout);
router.post("/:userId/logout", checkToken, logout);

router.get("", getUsers);
router.post("", createUser);
router.get("/:id", getUserById);
router.post("/:id", updateUser);
router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);

router.post("/registerToken", checkToken, RegisterAppToken);
router.post("/sendNotification", checkToken, SendNotification);
router.post("/sendToAll", SendNotificationToUsers);
router.post("/:userId/changePassword", ChangePassword);
router.post("/:userId/deviceTokens", UpdateDeviceToken);
module.exports = router;
