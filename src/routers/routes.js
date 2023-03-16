var express = require("express");
var router = express.Router();

const loginRouter = require("./login.routes");
const logoutRouter = require("./logout.routes");
const usersRouter = require("./user.routes");
const userRolesRouter = require("./userRole.routes");
const subscribersRouter = require("./subscriber.routes");
const appointmentsRouter = require("./appointment.routes");
const institutesRouter = require("./institution.routes");
const medicalCentersRouter = require("./medicalCenter.routes");
const schedulesRouter = require("./schedule.routes");

const medicalFileRouter = require("./midcalFiles.routes");
const smsRouter = require("./sms.routes");
const API_VERSION = "/v1";

router.use(API_VERSION + "/login", loginRouter);
router.use(API_VERSION + "/logout", logoutRouter);
router.use(API_VERSION + "/users", usersRouter);
router.use(API_VERSION + "/userRoles", userRolesRouter);
router.use(API_VERSION + "/subscribers", subscribersRouter);
router.use(API_VERSION + "/appointments", appointmentsRouter);
router.use(API_VERSION + "/institutions", institutesRouter);
router.use(API_VERSION + "/medicalCenters", medicalCentersRouter);
router.use(API_VERSION + "/schedules", schedulesRouter);
router.use(API_VERSION + "/sms", smsRouter);
router.use(API_VERSION + "/medicalFiles", medicalFileRouter);
router.use(API_VERSION + "/sms", smsRouter);
// router.use("/claims", claimsRouter);

module.exports = router;
