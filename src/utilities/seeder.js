const { connectDB, dropDB } = require("../config/database");
const UserServices = require("../services/userServices");
const DoctorServices = require("../services/doctorServices");
const SubscriberServices = require("../services/subscriberServices");
const AppointmentServices = require("../services/appointmentServices");
const commonServices = require('../services/commonServices');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Import Schema
const Cities = require('../schemas/citiesSchema'); 


// Import Data files
const UsersData = require("./users.json");
const DoctorData = require("./doctors.json");
const AppointmentsData = require("./appointments.json");
const SubscriberData = require("./subscriber.json");
const CitiesData = require("./cities.json");
const medicalSpecialtiesData = require("./medicalSpecialties.json");
const AppointmentStatusData = require('./AccountStatus.json');
const TimeSlotData = require('./TimeSlot.json');
const RelationshipToSubscriberData = require('./RelationshipToSubscriber.json');
const MedicalServiceData = require('./MedicalService.json');
const AccountStatusData = require('./AccountStatus.json');
const MedicalSpecialties = require("../schemas/medicalSpecialtiesSchema");
const appointmentStatusEnums = require("../schemas/appointmentStatusEnumsSchema");
const TimeSlotEnum = require("../schemas/timeSlotEnumSchema");
const relationshipToSubscriberEnum = require("../schemas/relationshipToSubscriberEnumSchema");
const MedicalServices = require("../schemas/medicalServicesSchema");
const AccountStatusEnum = require("../schemas/accountStatusEnumSchema");

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

// Add Cities Data
const createCitiesData = async () =>{
  try {
    for (let i = 0; i < CitiesData.length; i++) {
      const newBody = {
        ...CitiesData[i],
      };
      await commonServices.createOne({schemaName: Cities, body: newBody});
      console.log("City Added");
    }
  } catch (err) {
    console.error(err);
  }
}


// Add Medical Specialty

const createMedicalSpecialtiesData = async () =>{
  try {
    for (let i = 0; i < medicalSpecialtiesData.length; i++) {
      const newBody = {
        ...medicalSpecialtiesData[i],
      };
      await await commonServices.createOne({schemaName: MedicalSpecialties, body: newBody});
      console.log("Medical Specialties Added");
    }
  } catch (err) {
    console.error(err);
  }
}



// Add Appointment Status Data

const createAppointmentStatusData = async () =>{
  try {
    for (let i = 0; i < AppointmentStatusData.length; i++) {
      const newBody = {
        ...AppointmentStatusData[i],
      };
      await commonServices.createOne({schemaName: appointmentStatusEnums, body: newBody});
      console.log("Appointment Status Added");
    }
  } catch (err) {
    console.error(err);
  }
}


// Add Time Slot Data

const createTimeSlotData = async () =>{
  try {
    for (let i = 0; i < TimeSlotData.length; i++) {
      const newBody = {
        ...TimeSlotData[i],
      };
      await commonServices.createOne({schemaName: TimeSlotEnum, body: newBody});
      console.log("Time Slots Added");
    }
  } catch (err) {
    console.error(err);
  }
}


// Add Relationship to subscriber Data

const createRelationshipToSubscriberData = async () =>{
  try {
    for (let i = 0; i < RelationshipToSubscriberData.length; i++) {
      const newBody = {
        ...RelationshipToSubscriberData[i],
      };
      await commonServices.createOne({schemaName: relationshipToSubscriberEnum, body: newBody});
      console.log("Relationship to subscribers Added");
    }
  } catch (err) {
    console.error(err);
  }
}


// Add AccountStatus Data

const createAccountStatusData = async () =>{
  try {
    for (let i = 0; i < AccountStatusData.length; i++) {
      const newBody = {
        ...AccountStatusData[i],
      };
      await commonServices.createOne({schemaName: AccountStatusEnum, body: newBody});
      console.log("AccountStatus Added");
    }
  } catch (err) {
    console.error(err);
  }
}


// Add Medical Services Data
const createMedicalServcieData = async () =>{
  try {
    for (let i = 0; i < MedicalServiceData.length; i++) {
      const newBody = {
        ...MedicalServiceData[i],
      };
      await commonServices.createOne({schemaName: MedicalServices, body: newBody});
      console.log("Medical Services Added");
    }
  } catch (err) {
    console.error(err);
  }
}

const removeData = async () => {
  try {
    // drop database
    await dropDB();

    // inserting data

    // await createData();
    // await createDoctorData();
    // await createAppointmentsData();
    // await createSubscriberData();
    await createCitiesData();
    await createMedicalSpecialtiesData();
    await createAppointmentStatusData();
    await createTimeSlotData();
    await createRelationshipToSubscriberData();
    await createMedicalServcieData();
    await createAccountStatusData();

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

removeData();
