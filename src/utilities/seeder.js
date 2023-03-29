const connectDB = require("../config/database");
const mongoose = require("mongoose");
const User = require("../schemas/userSchema");
const Appointment = require("../schemas/appointmentSchema");
// const Audit = require("../schemas/auditSchema");
const Doctor = require("../schemas/doctorSchema");
const GenericService = require("../schemas/genericServiceSchema");
const Institution = require("../schemas/institutionSchema");
const MedicalCenter = require("../schemas/medicalCenterSchema");
const ScheduleSchema = require("../schemas/scheduleSchema");
const SmsSchema = require("../schemas/smsSchema");
const {
  subscribers,
  beneficiaries,
  medicalFiles,
} = require("../schemas/subscriberSchema");
const UserRole = require("../schemas/userRoleSchema");
const UserServices = require("../services/userServices");
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);

const seedUser = {
  username: "user",
  phoneNumber: "0912314455",
  phoneAuthenticated: false,
  firstName: "ahmad",
  secondName: "mohammed",
  lastName: "salem",
  password: "234",
};
const createData = async () => {
  try {
    const hash = bcrypt.hashSync(seedUser.password, 10);

    const newBody = {
      ...seedUser,
      password: hash,
    };
    await UserServices.createUser(newBody);
    console.log("User created");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const removeData = async () => {
  try {
    //connecting database
    await connectDB();
    ///Removing data
    await User.deleteMany();
    await Appointment.deleteMany();
    // await Audit.deleteMany();
    await Doctor.deleteMany();
    await GenericService.deleteMany();
    await Institution.deleteMany();
    await MedicalCenter.deleteMany();
    await ScheduleSchema.deleteMany();
    await SmsSchema.deleteMany();
    await subscribers.deleteMany();
    await beneficiaries.deleteMany();
    await medicalFiles.deleteMany();
    await UserRole.deleteMany();
    //creating user
    await createData();
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

removeData();
