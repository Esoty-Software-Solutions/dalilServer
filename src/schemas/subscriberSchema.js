// importing mongoose dependency for subscriber schema and model creation
const mongoose = require(`mongoose`);

// medicalFile schema or structure
const medicalFileSchema = mongoose.Schema({
  bloodType: {
    type: String,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  allergies: {
    type: Array,
    required: [false, `specify allergies`],
  },
  chronicDiseases: {
    type: Array,
    required: [false, `specify chronic diseases`],
  },
  surgeryHistory: {
    type: Array,
    required: [false, `specify surgery history`],
  },
  clinicalVisits: {
    type: Array,
    required: [false, `specify clinical visits`],
  },
  medicalTests: {
    type: Array,
    required: [false, `specify medical tests`],
  },
});

// beneficiary schema or structure
const beneficiarySchema = mongoose.Schema({
  // beneficiaryId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   set: (v) => new mongoose.Types.ObjectId(),
  //   required: [true, `please provide valid userId`],
  //   default: new mongoose.Types.ObjectId(),
  //   unique: true,
  // },
  firstName: {
    type: String,
    required: [true, `please provide valid firstName`],
  },
  middleName: {
    type: String,
    required: [true, `please provide valid middleName`],
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
    type: String,
    enum: ["male", "female"],
    required: [true, `please provide valid gender`],
  },
  relationshipToSubscriber: {
    type: String,
    enum: ["self", "father", "mother", "wife", "husband", "daughter", "son"],
    required: [true, `please specify relationship to the main subscriber `],
  },
  medicalFiles: {
    type: medicalFileSchema,
    required: false,
  },
});

const institutionObjectSchema = mongoose.Schema({
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    set: (v) => mongoose.Types.ObjectId(v),
    ref: "institutions",
    required: [false, `please provide valid institution id`],
  },
  employeeId: {
    type: String,
    unique: [true, "employee ID has to be unique"],
    required: [false, `please provide valid employee ID`],
  },
});

// subscriber schema or structure
const subscriberSchema = mongoose.Schema({
  // subscriberId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   set:(v) => new mongoose.Types.ObjectId(),
  //   required: [true, `please provide valid userId`],
  //   default: new mongoose.Types.ObjectId(),
  //   unique: true,
  // },
  firstName: {
    type: String,
    required: [true, `please provide valid firstName`],
  },
  middleName: {
    type: String,
    required: [true, `please provide valid middleName`],
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
    type: String,
    enum: ["male", "female"],
    required: [true, `please provide valid gender`],
  },
  beneficiaries: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "beneficiaries",
    required: [false, `please provide valid family member `],
  },
  institutionObject: {
    type: institutionObjectSchema,
    required: false,
    strict: false,
  },

  residentCity: {
    type: String,
    // required: [true, `please provide valid resident City `],
  },
  residentDistrict: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    set: (v) => mongoose.Types.ObjectId(v),
    ref: "users",
    // required: [true, `please provide valid user id`],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    set: (v) => mongoose.Types.ObjectId(v),
    ref: "users",
    // required: [true, `please record the user who created this`],
  },
  createdTimeStamp: {
    type: Date,
    set: (v) => Date(v),
    get: (v) => v.toISOString(),
    required: [true, `please record the datetime this was created`],
    default: new Date(),
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    set: (v) => mongoose.Types.ObjectId(v),
    ref: "users",
  },
  updatedTimeStamp: {
    type: Date,
    set: (v) => Date(v),
    get: (v) => v.toISOString(),
  },
});

const subscribers = mongoose.model(`subscribers`, subscriberSchema);
const beneficiaries = mongoose.model(`beneficiaries`, beneficiarySchema);

module.exports = { subscribers, beneficiaries };
