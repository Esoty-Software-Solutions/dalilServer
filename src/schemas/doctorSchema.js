// importing mongooose for doctorSchema and collection setups
const mongoose = require(`mongoose`);

// doctor schema setup
const doctorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, `please enter valid first name`],
    },
    secondName: {
      type: String,
      required: [true, `please enter valid second name`],
    },
    lastName: {
      type: String,
      required: [true, `please enter valid last name`],
    },
    specialty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "medicalSpecialties",
      required: [true, `please provide valid doctor id`],
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
  },
  { collection: "doctors" }
);

const doctor = mongoose.model(`doctors`, doctorSchema);

module.exports = doctor;
