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
const notificationRouter = require("./notification.routes");
const doctorRouter = require("./doctor.routes");
const medicalFileRouter = require("./midcalFiles.routes");
const smsRouter = require("./sms.routes");
const relationshipToSubscriber = require("./relationshipToSubscriber.routes");
const appointmentStatusEnums = require("./appointmentStatusEnums.routes");
const medicalSpecialties = require("./medicalSpecialties.routes");
const medicalServices = require("./medicalServices.routes");
const timeSlotEnumRouter = require("./timeSlotEnum.routes");
const accountStatusEnumRouter = require("./accountStatusEnum.routes");
const cityRouter = require("./city.routes");
const roleRouter = require("./role.routes");
const genderEnumRouter = require("./genderEnum.routes");

const reviewRouter = require("./review.routes");
const API_VERSION = "/v1";
const prescriptionsRouter = require("./prescriptions.routes");
const pharmacyRouter = require("./pharmacy.routes");

router.get(API_VERSION + "/serverHealth", (req, res) => {
  res.type("json");
  res.status(200).send(JSON.stringify({ Message: "Server is up and running" }));
});
router.use(API_VERSION + "/login", loginRouter);
router.use(API_VERSION + "/logout", logoutRouter);
router.use(API_VERSION + "/users", usersRouter);
router.use(API_VERSION + "/userRoles", userRolesRouter);
router.use(API_VERSION + "/subscribers", subscribersRouter); // pending 
router.use(API_VERSION + "/appointments", appointmentsRouter); // done
router.use(API_VERSION + "/institutions", institutesRouter); // done
router.use(API_VERSION + "/prescriptions", prescriptionsRouter);
router.use(API_VERSION + "/medicalCenters", medicalCentersRouter);
router.use(API_VERSION + "/pharmacies", pharmacyRouter);
router.use(API_VERSION + "/schedules", schedulesRouter);
router.use(API_VERSION + "/TestPushNotification", notificationRouter);
router.use(API_VERSION + "/sms", smsRouter);
router.use(API_VERSION + "/medicalFiles", medicalFileRouter);
router.use(API_VERSION + "/doctors", doctorRouter); // done
router.use(API_VERSION + "/review", reviewRouter); // pending
router.use(API_VERSION + "/role", roleRouter); // done
// router.use("/claims", claimsRouter);

// Miscellaneous APIs
router.use(API_VERSION + "/misc/appointmentStatusEnum", appointmentStatusEnums); // done
router.use(API_VERSION + "/misc/relationshipToSubscriberEnum",relationshipToSubscriber); // done
router.use(API_VERSION + "/misc/appointmentStatusEnum", appointmentStatusEnums); // done
router.use(API_VERSION + "/misc/medicalSpecialties", medicalSpecialties); // done
router.use(API_VERSION + "/misc/medicalServices", medicalServices); // done
router.use(API_VERSION + "/misc/timeSlotEnum", timeSlotEnumRouter); // done 
router.use(API_VERSION + "/misc/accountStatusEnum", accountStatusEnumRouter);  // done
router.use(API_VERSION + "/misc/cities", cityRouter);  // done
router.use(API_VERSION + "/misc/genderEnum", genderEnumRouter);  // done
module.exports = router;
