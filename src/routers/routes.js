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
router.use(API_VERSION + "/login", loginRouter);// done
router.use(API_VERSION + "/logout", logoutRouter); // done
router.use(API_VERSION + "/users", usersRouter); // done
router.use(API_VERSION + "/userRoles", userRolesRouter); // done
router.use(API_VERSION + "/subscribers", subscribersRouter); // pending 
router.use(API_VERSION + "/appointments", appointmentsRouter); // done
router.use(API_VERSION + "/institutions", institutesRouter); // done
router.use(API_VERSION + "/prescriptions", prescriptionsRouter); // done
router.use(API_VERSION + "/medicalCenters", medicalCentersRouter); // done
router.use(API_VERSION + "/pharmacies", pharmacyRouter); // done
router.use(API_VERSION + "/schedules", schedulesRouter); // done 
router.use(API_VERSION + "/TestPushNotification", notificationRouter); // services not included
router.use(API_VERSION + "/sms", smsRouter); // done
router.use(API_VERSION + "/medicalFiles", medicalFileRouter); // schema different
router.use(API_VERSION + "/doctors", doctorRouter);
router.use(API_VERSION + "/review", reviewRouter);
router.use(API_VERSION + "/role", roleRouter);
// router.use("/claims", claimsRouter);

// Miscellaneous APIs
router.use(API_VERSION + "/misc/appointmentStatusEnum", appointmentStatusEnums);
router.use(
  API_VERSION + "/misc/relationshipToSubscriberEnum",
  relationshipToSubscriber,
);
router.use(API_VERSION + "/misc/appointmentStatusEnum", appointmentStatusEnums);
router.use(API_VERSION + "/misc/medicalSpecialties", medicalSpecialties);
router.use(API_VERSION + "/misc/medicalServices", medicalServices);
router.use(API_VERSION + "/misc/timeSlotEnum", timeSlotEnumRouter);
router.use(API_VERSION + "/misc/accountStatusEnum", accountStatusEnumRouter);
router.use(API_VERSION + "/misc/cities", cityRouter);
router.use(API_VERSION + "/misc/genderEnum", genderEnumRouter);
module.exports = router;
