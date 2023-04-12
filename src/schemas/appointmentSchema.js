const mongoose = require(`mongoose`);

const appointmentSchema = mongoose.Schema(
  {
    appointmentDate: { type: Date },
    timeSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "timeSlotEnum",
      required: [true, `please provide valid time slot id`],
    },
    appointmentStatus: {
      type: String,
    },

    beneficiaryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "beneficiaries",
      required: [true, `please provide valid beneficiary id`],
    },
    scheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "schedules",
      required: [true, `please provide valid schedule id`],
    },
    medicalCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "medicalCenters",
      required: [true, `please provide valid medicalCenter id`],
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctors",
      required: [true, `please provide valid doctor id`],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, `please provide valid userId`],
    },

    notes: { type: String },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const appointment = mongoose.model(`appointments`, appointmentSchema);

module.exports = appointment;
