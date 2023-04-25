const mongoose = require(`mongoose`);

const scheduleSchema = new mongoose.Schema(
  {
    medicalCenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "medicalCenters",
      required: [true, `please provide valid medicalCenter id`],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctors",
      required: [true, `please provide valid doctor id`],
    },
    timeSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "timeSlotEnum",
      required: [true, `please provide valid timeslot`],
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


scheduleSchema.pre(['find' , 'findOne' , 'save' , 'create'], function(next) {
  this.populate('medicalCenterId' , '-__v');
  this.populate('doctorId' , '-__v');

  next();
});


const schedule = mongoose.model(`schedules`, scheduleSchema);

module.exports = schedule;
