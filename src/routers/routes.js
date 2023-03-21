import express from "express";
var router = express.Router();

// const loginRouter = require("./login.routes");
// const logoutRouter = require("./logout.routes");
import usersRouter from "./user.routes.js";
import userRolesRouter from "./userRole.routes.js";
import subscribersRouter from "./subscriber.routes.js";
import appointmentsRouter from "./appointment.routes.js";
import institutesRouter from "./institution.routes.js";
import medicalCentersRouter from "./medicalCenter.routes.js";
import schedulesRouter from "./schedule.routes.js";
import medicalFileRouter from "./midcalFiles.routes.js";
const API_VERSION = "/v1";

// router.use(API_VERSION + "/login", loginRouter);
// router.use(API_VERSION + "/logout", logoutRouter);
router.use(API_VERSION + "/users", usersRouter);
router.use(API_VERSION + "/userRoles", userRolesRouter);
router.use(API_VERSION + "/subscribers", subscribersRouter);
router.use(API_VERSION + "/appointments", appointmentsRouter);
router.use(API_VERSION + "/institutions", institutesRouter);
router.use(API_VERSION + "/medicalCenters", medicalCentersRouter);
router.use(API_VERSION + "/schedules", schedulesRouter);
router.use(API_VERSION + "/medicalFiles", medicalFileRouter);
// router.use("/claims", claimsRouter);

export default router;
