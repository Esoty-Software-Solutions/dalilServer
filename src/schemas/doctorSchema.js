// importing mongooose for doctorSchema and collection setups
const mongoose = require(`mongoose`);

// doctor schema setup
const doctorSchema = mongoose.Schema({
  doctorId: { type: mongoose.ObjectId, unique: true },
  firstName: {
    type: String,
    required: [true, `please enter valid first name`],
  },
  middleName: {
    type: String,
    required: [true, `please enter valid middle name`],
  },
  lastName: {
    type: String,
    required: [true, `please enter valid last name`],
  },
  specialty: {
    type: String,
    required: [true, `please enter valid specialty`],
  },
  level: {
    type: String,
    required: [true, `please enter valid level`],
  },
  gender: {
    type: String,
    required: [true, `please enter valid gender`],
  },
  birthdate: {
    type: String,
    required: [true, `please enter valid birthdate`],
  },
  commentCount: {
    type: String,
    default: 0
  },
  starRating: {
    type: Number,
    default: 0,
  },
  fieldNames: {type: Array},
  originalNames: {type: Array},
  created: {
    createdBy: { type: mongoose.ObjectId},
    dateCreated: { type: Date},
  },
  updated: {
    updatedBy: { type: mongoose.ObjectId},
    dateUpdated: { type: Date},
  }
}, { collection: 'doctors' });

const doctor = mongoose.model(`doctors`, doctorSchema);

module.exports = doctor;
