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
const { authentication } = require("../utilities/auth");
var router = express.Router();

router.post("/login", login);
router.post("/:userId/logout", logout);

router.get("", authentication,getUsers);
router.post("", authentication,createUser);
router.get("/:id", authentication,getUserById);
router.post("/:id", authentication,updateUser);
router.patch("/:id", authentication,updateUser);
// router.delete("/:id", deleteUser);

router.post("/registerToken", RegisterAppToken);
router.post("/sendNotification", SendNotification);
router.post("/sendToAll", SendNotificationToUsers);
router.post("/:userId/changePassword", ChangePassword);
router.post("/:userId/deviceTokens", UpdateDeviceToken);
module.exports = router;
