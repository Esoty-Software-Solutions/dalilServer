const mongoose = require(`mongoose`);

const scheduleSchema = new mongoose.Schema(
  {
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
    timeslot: {
      type: String,
      required: [true, `please provide valid timeslot`],
      enum: ["morning", "afternoon", "evening"],
    },
    monday: {
      type: Boolean,
    },
    tuesday: {
      type: Boolean,
    },
    wednesday: {
      type: Boolean,
    },
    thursday: {
      type: Boolean,
    },
    friday: {
      type: Boolean,
    },
    saturday: {
      type: Boolean,
    },
    sunday: {
      type: Boolean,
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
      default: true,
    },
  },
  { timestamps: true }
);

const schedule = mongoose.model(`schedules`, scheduleSchema);

module.exports = schedule;
