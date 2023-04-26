const { connectDB, dropDB } = require("../../config/database");
const UserServices = require("../../services/userServices");
const DoctorServices = require("../../services/doctorServices");
const SubscriberServices = require("../../services/subscriberServices");
const AppointmentServices = require("../../services/appointmentServices");
const commonServices = require("../../services/commonServices");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Import Schema
const Cities = require("../../schemas/citiesSchema");
const MedicalSpecialties = require("../../schemas/medicalSpecialtiesSchema");
const appointmentStatusEnums = require("../../schemas/appointmentStatusEnumsSchema");
const TimeSlotEnum = require("../../schemas/timeSlotEnumSchema");
const relationshipToSubscriberEnum = require("../../schemas/relationshipToSubscriberEnumSchema");
const MedicalServices = require("../../schemas/medicalServicesSchema");
const AccountStatusEnum = require("../../schemas/accountStatusEnumSchema");
const Gender = require("../../schemas/genderEnumSchema");
const genericService = require("../../schemas/genericServiceSchema");
const institution = require("../../schemas/institutionSchema");
const Level = require("../../schemas/levelEnumSchema");
const medicalCenter = require("../../schemas/medicalCenterSchema");
const pharmacy = require("../../schemas/pharmacySchema");
const prescriptionCenter = require("../../schemas/prescriptionSchema");
const Review = require("../../schemas/reviewSchema");
const schedule = require("../../schemas/scheduleSchema");
const sms = require("../../schemas/smsSchema");

// Import Data files
const UsersData = require("./data/users.json");
const DoctorData = require("./data/doctors.json");
const AppointmentsData = require("./data/appointments.json");
const BeneficiaryData = require("./data/beneficiary.json");
const SubscriberData = require("./data/subscriber.json");
const CitiesData = require("./data/cities.json");
const medicalSpecialtiesData = require("./data/medicalSpecialties.json");
const AppointmentStatusData = require("./data/AccountStatus.json");
const TimeSlotData = require("./data/TimeSlot.json");
const RelationshipToSubscriberData = require("./data/RelationshipToSubscriber.json");
const MedicalServiceData = require("./data/MedicalService.json");
const AccountStatusData = require("./data/AccountStatus.json");
const GenderData = require("./data/genderEnum.json");
const GenericServiceData = require("./data/genericService.json");
const InstitutionData = require("./data/institution.json");
const LevelData = require("./data/levelEnum.json");
const MedicalCenterData = require("./data/medicalCenter.json");
const PharmacyData = require("./data/pharmacy.json");
const PrescriptionData = require("./data/prescription.json");
const ReviewData = require("./data/review.json");
const ScheduleData = require("./data/schedule.json");
const SMSData = require("./data/sms.json");
const UserRoleData = require("./data/userRole.json");
const userRole = require("../../schemas/userRoleSchema");

// add fake schema
const fakerSchema = require("./data/FakerSchemas");
const doctor = require("../../schemas/doctorSchema");
const user = require("../../schemas/userSchema");

// Add AccountStatus Data

const createAccountStatusData = async () => {
  try {
    for (let i = 0; i < AccountStatusData.length; i++) {
      const newBody = {
        ...AccountStatusData[i],
      };
      await commonServices.createOne({
        schemaName: AccountStatusEnum,
        body: newBody,
      });
      console.log("AccountStatus Added");
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

// Add Appointment Status Data

const createAppointmentStatusData = async () => {
  try {
    for (let i = 0; i < AppointmentStatusData.length; i++) {
      const newBody = {
        ...AppointmentStatusData[i],
      };
      await commonServices.createOne({
        schemaName: appointmentStatusEnums,
        body: newBody,
      });
      console.log("Appointment Status Added");
    }
  } catch (err) {
    console.error(err);
  }
};

// Add Cities Data
const createCitiesData = async () => {
  try {
    for (let i = 0; i < CitiesData.length; i++) {
      const newBody = {
        ...CitiesData[i],
      };
      await commonServices.createOne({ schemaName: Cities, body: newBody });
      console.log("City Added");
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

const createGenderData = async () => {
  try {
    for (let i = 0; i < GenderData.length; i++) {
      const newBody = {
        ...GenderData[i],
      };
      await commonServices.createOne({ schemaName: Gender, body: newBody });
      console.log("Gender Data created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createGenericServiceData = async () => {
  try {
    for (let i = 0; i < GenericServiceData.length; i++) {
      const newBody = {
        ...GenericServiceData[i],
      };
      await commonServices.createOne({
        schemaName: genericService,
        body: newBody,
      });
      console.log("Generic Service Data created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createInstitutionData = async () => {
  try {
    for (let i = 0; i < InstitutionData.length; i++) {
      const newBody = {
        ...InstitutionData[i],
      };
      await commonServices.createOne({
        schemaName: institution,
        body: newBody,
      });
      console.log("Institution Data created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createLevelEnumData = async () => {
  try {
    for (let i = 0; i < LevelData.length; i++) {
      const newBody = {
        ...LevelData[i],
      };
      await commonServices.createOne({ schemaName: Level, body: newBody });
      console.log("Level Enum Data created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createMedicalCenterData = async () => {
  try {
    for (let i = 0; i < MedicalCenterData.length; i++) {
      const newBody = {
        ...MedicalCenterData[i],
      };
      await commonServices.createOne({
        schemaName: medicalCenter,
        body: newBody,
      });
      console.log("Medical center Data created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createPharmacyData = async () => {
  try {
    for (let i = 0; i < PharmacyData.length; i++) {
      const newBody = {
        ...PharmacyData[i],
      };
      await commonServices.createOne({ schemaName: pharmacy, body: newBody });
      console.log("Pharmacy Data created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createPrescriptionData = async () => {
  try {
    for (let i = 0; i < PrescriptionData.length; i++) {
      const newBody = {
        ...PrescriptionData[i],
      };
      await commonServices.createOne({
        schemaName: prescriptionCenter,
        body: newBody,
      });
      console.log("Prescription Data created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createReviewData = async () => {
  try {
    for (let i = 0; i < ReviewData.length; i++) {
      const newBody = {
        ...ReviewData[i],
      };
      await commonServices.createOne({ schemaName: Review, body: newBody });
      console.log("Review Data created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createScheduleData = async () => {
  try {
    for (let i = 0; i < ScheduleData.length; i++) {
      const newBody = {
        ...ScheduleData[i],
      };
      await commonServices.createOne({ schemaName: schedule, body: newBody });
      console.log("Schedule Data created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createSMSData = async () => {
  try {
    for (let i = 0; i < SMSData.length; i++) {
      const newBody = {
        ...SMSData[i],
      };
      await commonServices.createOne({ schemaName: sms, body: newBody });
      console.log("SMS Data created");
    }
  } catch (err) {
    console.error(err);
  }
};

// Add Medical Services Data
const createMedicalServcieData = async () => {
  try {
    for (let i = 0; i < MedicalServiceData.length; i++) {
      const newBody = {
        ...MedicalServiceData[i],
      };
      await commonServices.createOne({
        schemaName: MedicalServices,
        body: newBody,
      });
      console.log("Medical Services Added");
    }
  } catch (err) {
    console.error(err);
  }
};

// Add Medical Specialty

const createMedicalSpecialtiesData = async () => {
  try {
    for (let i = 0; i < medicalSpecialtiesData.length; i++) {
      const newBody = {
        ...medicalSpecialtiesData[i],
      };
      await await commonServices.createOne({
        schemaName: MedicalSpecialties,
        body: newBody,
      });
      console.log("Medical Specialties Added");
    }
  } catch (err) {
    console.error(err);
  }
};

// Add Relationship to subscriber Data
const createRelationshipToSubscriberData = async () => {
  try {
    for (let i = 0; i < RelationshipToSubscriberData.length; i++) {
      const newBody = {
        ...RelationshipToSubscriberData[i],
      };
      await commonServices.createOne({
        schemaName: relationshipToSubscriberEnum,
        body: newBody,
      });
      console.log("Relationship to subscribers Added");
    }
  } catch (err) {
    console.error(err);
  }
};

const createBeneficiaryData = async () => {
  try {
    console.log("GeneratingFake");
    const fakeBeneficiaries = [];
    for (let i = 0; i < 50; i++) {
      const sample = fakerSchema.randomBeneficiary();
      const genderObject = await commonServices.getOne({ schemaName: Gender });
      sample.gender = genderObject._id;
      const relationshipToSubscriberEnumObject = await commonServices.getOne({ schemaName: relationshipToSubscriberEnum });
      sample.relationshipToSubscriber = relationshipToSubscriberEnumObject._id;
      fakeBeneficiaries.push(sample);
    }


    await SubscriberServices.insertManyBeneficiaries(fakeBeneficiaries);
    console.log("Fake beneficiaries inserted");

    for (let i = 0; i < BeneficiaryData.length; i++) {
      const newBody = {
        ...BeneficiaryData[i],
      };
      await SubscriberServices.createBeneficiaries(newBody);
      console.log("Beneficiary created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createSubscriberData = async () => {
  try {

    const fakeSubscriber = [];
    const fakeBeneficiaries = [];

    for (let i = 0; i < 10; i++) {
      const fakeData = fakerSchema.randomSubscriber();
      const genderObject = await commonServices.getOne({ schemaName: Gender });
      fakeData.gender = genderObject._id;
      fakeData.beneficiaries = [];
      const institutionObject = await commonServices.getOne({ schemaName: institution });
      fakeData.institutionId = institutionObject._id;
      const doctorObejct = await commonServices.getOne({ schemaName: doctor });
      fakeData.doctorId = doctorObejct._id;
      const cityObejct = await commonServices.getOne({ schemaName: Cities });
      fakeData.city = cityObejct._id;
      const userObject = await commonServices.getOne({ schemaName: user });
      fakeData.userId = userObject._id;

      for (let i = 0; i < 4; i++) {
        const sample = fakerSchema.randomBeneficiary();
        const genderObject = await commonServices.getOne({ schemaName: Gender });
        sample.gender = genderObject._id;
        const relationshipToSubscriberEnumObject = await commonServices.getOne({ schemaName: relationshipToSubscriberEnum });
        sample.relationshipToSubscriber = relationshipToSubscriberEnumObject._id;
        fakeBeneficiaries.push(sample);
        fakeData.beneficiaries.push(sample._id);
      }

      fakeSubscriber.push(fakeData)
    }

    await SubscriberServices.insertManyBeneficiaries(fakeBeneficiaries);
    console.log("Fake beneficiaries inserted");

    console.log(fakeSubscriber);

    await SubscriberServices.insertManySubscribers(fakeSubscriber);
    console.log("Fake Subscribers inserted");

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

// Add Time Slot Data

const createTimeSlotData = async () => {
  try {
    for (let i = 0; i < TimeSlotData.length; i++) {
      const newBody = {
        ...TimeSlotData[i],
      };
      await commonServices.createOne({
        schemaName: TimeSlotEnum,
        body: newBody,
      });
      console.log("Time Slots Added");
    }
  } catch (err) {
    console.error(err);
  }
};

const createUserRoleData = async () => {
  try {
    for (let i = 0; i < UserRoleData.length; i++) {
      const newBody = {
        ...UserRoleData[i],
      };
      await commonServices.createOne({ schemaName: userRole, body: newBody });
      console.log("UserRole Data created");
    }
  } catch (err) {
    console.error(err);
  }
};

const createUserData = async () => {
  try {
    for (let i = 0; i < UsersData.length; i++) {

      const newBody = {
        ...UsersData[i]
      };
      await UserServices.createUser(newBody);
      console.log("User created");
    }
  } catch (err) {
    console.error(err);
  }
};

const removeData = async () => {
  try {
    // drop database
    await dropDB();

    // inserting data

    await createUserData();



    await createAccountStatusData();
    await createAppointmentsData();
    await createAppointmentStatusData();
    await createCitiesData();
    await createDoctorData();
    await createGenderData();
    await createGenericServiceData();
    await createInstitutionData();
    await createLevelEnumData();
    await createMedicalCenterData();
    await createPharmacyData();
    await createPrescriptionData();
    await createReviewData();
    await createScheduleData();
    await createSMSData();
    await createMedicalServcieData();
    await createMedicalSpecialtiesData();
    await createRelationshipToSubscriberData();
    await createTimeSlotData();
    await createUserRoleData();
    
    await createBeneficiaryData();
    await createSubscriberData();
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

removeData();
