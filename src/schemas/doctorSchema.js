// importing mongooose for doctorSchema and collection setups
const moment = require("moment/moment");
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
      // required: [true, `please enter valid second name`],
    },
    lastName: {
      type: String,
      required: [true, `please enter valid last name`],
    },
    specialty: {
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
      type: Date,
      set: (v) => Date(v),
      get: (v) => v.toISOString().split(`T`)[0],
      // required: [true, `please provide valid date`], 
    },
    starRating: { type: Number, default: null},
    commentCount: { type: Number, default: 0 },
  },
  { collection: "doctors" }
);
doctorSchema.post(["findOne" , "find" , "findOneAndUpdate"] , function (doc) {
  if(Array.isArray(doc)) {
    doc.forEach(document => document.birthdate = moment(document.birthdate).format('YYYY-MM-DD'));
  }else if (doc) {
    doc.birthdate = moment(doc.birthdate).format('YYYY-MM-DD');
  }
});

doctorSchema.pre(['find' , 'findOne' , 'save' , 'findOneAndUpdate'], function(next) {
  this.populate('specialty' , '-__v ');
  this.populate('gender' , '-__v');
  next();
});

const doctor = mongoose.model(`doctors`, doctorSchema);

module.exports = doctor;
