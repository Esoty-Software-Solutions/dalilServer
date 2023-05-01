const mongoose = require(`mongoose`);

const appointmentSchema = new mongoose.Schema(
  {
    appointmentDate: {
      type: Date,
      set: (v) => Date(v),
      get: (v) => v.toISOString().split(`T`)[0],
      required: [true, `please provide valid date`],
    },
    timeSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "timeSlotEnum",
      required: [true, `please provide valid time slot id`],
    },
    appointmentStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointmentStatusEnums",
      required: [true, `please provide valid time slot id`],
    },
    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "beneficiaries",
      required: [true, `please provide valid beneficiary id`],
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "schedules",
      required: [true, `please provide valid schedule id`],
    },
    notes: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, `please provide valid user id`],
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true },
);


appointmentSchema.pre(['find' , 'findOne' , 'save' , 'findOneAndUpdate'], function(next) {
  this.populate('appointmentStatus' , '-__v -id');
  this.populate('timeSlot' , '-__v');
  this.populate('beneficiary' , '-__v');
  this.populate('schedule' , '-__v');
  this.populate('createdBy' , '-__v');
  next();
});

const appointment = mongoose.model(`appointments`, appointmentSchema);

module.exports = appointment;
