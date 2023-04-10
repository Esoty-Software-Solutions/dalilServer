// importing mongoose dependency for subscriber schema and model creation
const mongoose = require(`mongoose`);
// const audit = require(`./auditSchema`);

// // medicalFile schema or structure
// const medicalFileSchema = new mongoose.Schema({
//   bloodType: {
//     type: String,
//   },
//   height: {
//     type: Number,
//   },
//   weight: {
//     type: Number,
//   },
//   medicalTests: {
//     type: Array,
//     required: [false, `specify medical tests`],
//   },
//   // file: {
//   //   type: String,
//   // },
// });
// beneficiary schema or structure
const beneficiarySchema = new mongoose.Schema({
  // beneficiaryId: {
  //   type: String,
  //   required: [true, `please provide valid beneficiaryId`],
  //   unique: true,
  // },
  firstName: {
    type: String,
    required: [true, `please provide valid firstName`],
  },
  secondName: {
    type: String,
    required: [true, `please provide valid secondName`],
  },
  thirdName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, `please provide valid lastName`],
  },
  birthdate: {
    type: String,
    required: [true, `please provide valid birthdate`],
  },
  gender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gender",
    required: [true, `please enter valid gender`],
  },
  relationshipToSubscriber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "relationshipToSubscriberEnum",
    required: [true, `please provide valid relatioship id`],
  },

  medicalFiles: {
    bloodType: String,
    height: Number,
    weight: Number,
  },
});

// subscriber schema or structure
const subscriberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, `please provide valid firstName`],
  },
  secondName: {
    type: String,
    required: [true, `please provide valid secondName`],
  },
  thirdName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, `please provide valid lastName`],
  },
  birthdate: {
    type: String,
    required: [true, `please provide valid birthdate`],
  },
  phoneNumber: {
    type: String,
    required: [true, `please provide valid phoneNumber `],
  },
  gender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gender",
    required: [true, `please enter valid gender`],
  },
  beneficiaries: {
    // type: [beneficiarySchema],
    type: [mongoose.Schema.Types.ObjectId],
    set: (v) => mongoose.Types.ObjectId(v),
    ref: "beneficiaries",
    required: [false, `please provide valid beneficiary ID `],
  },
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    set: (v) => mongoose.Types.ObjectId(v),
    ref: "institutions",
    required: [false, `please provide valid institution id`],
  },
  employeeId: {
    type: String,
    // unique: [true, `employee ID has to be unique`],
    // required: [false, `please provide valid employee ID`],
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    set: (v) => mongoose.Types.ObjectId(v),
    ref: "doctors",

    // unique: [true, `employee ID has to be unique`],
    // required: [false, `please provide valid employee ID`],
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    set: (v) => mongoose.Types.ObjectId(v),
    ref: "city",
    required: [true, `please enter valid city`],
  },
  residentDistrict: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    set: (v) => mongoose.Types.ObjectId(v),
    ref: "users",
    // required: [true, `please provide valid user id`],
  },
  // audit,
});

const subscribers = mongoose.model(`subscribers`, subscriberSchema);
const beneficiaries = mongoose.model(`beneficiaries`, beneficiarySchema);
// const medicalFiles = mongoose.model(`medicalFiles`, medicalFileSchema);

module.exports = { subscribers, beneficiaries };
