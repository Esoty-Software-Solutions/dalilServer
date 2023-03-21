import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    appointmentDate: { type: Date },
    timeslot: { type: String },
    appointmentStatus: {
      type: String,
    },
    patient: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, `please provide valid userId`],
      },
      patientType: {
        type: String,
        required: [true, `please provide valid patientType`],
      },
      patientRelationship: {
        type: String,
        required: [true, `please provide valid patientRelationship`],
      },
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
      ref: "users",
      required: [true, `please provide valid doctor id`],
    },
    notes: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, `please provide valid userId`],
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const appointment = mongoose.model(`appointments`, appointmentSchema);

export default appointment;
