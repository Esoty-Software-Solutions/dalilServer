import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema(
  {
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
    timeslot: {
      type: String,
      required: [true, `please provide valid timeslot`],
    },
    monday: {
      type: Boolean,
      required: [true, `please provide valid date`],
    },
    tuesday: {
      type: Boolean,
      required: [true, `please provide valid date`],
    },
    wednesday: {
      type: Boolean,
      required: [true, `please provide valid date`],
    },
    thursday: {
      type: Boolean,
      required: [true, `please provide valid date`],
    },
    friday: {
      type: Boolean,
      required: [true, `please provide valid date`],
    },
    saturday: {
      type: Boolean,
      required: [true, `please provide valid date`],
    },
    sunday: {
      type: Boolean,
      required: [true, `please provide valid date`],
    },

    price: {
      type: Number,
      required: [true, `please provide valid price`],
    },
    startDate: {
      type: String,
      required: [true, `please provide valid startDate`],
    },
    endDate: {
      type: String,
      required: [true, `please provide valid endDate`],
    },
    isActive: {
      type: Boolean,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const schedule = mongoose.model(`schedules`, scheduleSchema);

export default schedule;
