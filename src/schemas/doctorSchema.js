// importing mongooose for doctorSchema and collection setups
const mongoose = require(`mongoose`);

// doctor schema setup
const doctorSchema = new mongoose.Schema(
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
    specialtyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "medicalSpecialties",
      required: [true, `please provide valid specialty id`],
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "level",
      // required: [true, `please enter valid level`],
    },
    gender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "gender",
      required: [true, `please enter valid gender`],
    },
    birthdate: {
      type: String,
      required: [true, `please enter valid birthdate`],
    },
    starRating: { type: Number},
    commentCount: { type: Number, default: 0 },
  },
  { collection: "doctors" }
);

doctorSchema.pre(['find' , 'findOne' , 'save'], function(next) {
  this.populate('specialtyId' , '-__v -_id -id');
  next();
});

const doctor = mongoose.model(`doctors`, doctorSchema);

module.exports = doctor;
