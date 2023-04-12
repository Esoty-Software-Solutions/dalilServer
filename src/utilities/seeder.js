const { connectDB, dropDB } = require("../config/database");
const UserServices = require("../services/userServices");
const DoctorServices = require("../services/doctorServices");
const SubscriberServices = require("../services/subscriberServices");
const AppointmentServices = require("../services/appointmentServices");

const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);
const UsersData = require("./jsonFile/users.json");
const DoctorData = require("./jsonFile/doctors.json");
const AppointmentsData = require("./jsonFile/appointments.json");
const SubscriberData = require("./jsonFile/subscriber.json");

const createData = async () => {
  try {
    for (let i = 0; i < UsersData.length; i++) {
      const hash = bcrypt.hashSync(UsersData[i].password, 10);

      const newBody = {
        ...UsersData[i],
        password: hash,
      };
      await UserServices.createUser(newBody);

      console.log("User created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createDoctorData = async () => {
  try {
    for (let i = 0; i < DoctorData.length; i++) {
      const newBody = {
        ...DoctorData[i],
      };
      await DoctorServices.createDoctor(newBody);
      console.log("Doctor created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createSubscriberData = async () => {
  try {
    for (let i = 0; i < SubscriberData.length; i++) {
      const newBody = {
        ...SubscriberData[i],
      };
      await SubscriberServices.createSubscriber(newBody);
      console.log("Subscriber created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createAppointmentsData = async () => {
  try {
    for (let i = 0; i < AppointmentsData.length; i++) {
      const newBody = {
        ...AppointmentsData[i],
      };
      await AppointmentServices.createAppointment(newBody);
      console.log("Appointment created");
    }
  } catch (err) {
    console.error(err);
  }
};

const removeData = async () => {
  try {
    //drop databse
    await dropDB();

    //inserting data
    await createData();
    await createDoctorData();
    await createAppointmentsData();
    await createSubscriberData();

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

removeData();
