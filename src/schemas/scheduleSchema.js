const mongoose = require(`mongoose`);
const moment = require("moment");
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
      type: Date,
      set: (v) => new Date(v),
      get: (v) => v.toISOString().split(`T`)[0],
      required: [true, `please provide valid startDate`]
    },
    endDate: {
      type: Date,
      set: (v) => new Date(v),
      get: (v) => v.toISOString().split(`T`)[0], 
      required: [true, `please provide valid endDate`],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

scheduleSchema.post(["findOne" , "find" , "findOneAndUpdate"] , function (doc) {
  if(Array.isArray(doc)) {
    doc.forEach(document => {
      document.startDate = moment(document.startDate).format('YYYY-MM-DD')
      document.endDate = moment(document.endDate).format('YYYY-MM-DD')
    });
  }else if (doc) {
    doc.startDate = moment(doc.startDate).format('YYYY-MM-DD');
    doc.endDate = moment(doc.endDate).format('YYYY-MM-DD')
  }
});

scheduleSchema.pre(['find' , 'findOne' , 'save' , 'create' , 'findOneAndUpdate'], function(next) {
  this.populate('timeSlot' , '-__v -_id -id');
  this.populate('medicalCenter');
  this.populate('doctor');
  this.populate('timeSlot');
  
  next();
});


const schedule = mongoose.model(`schedules`, scheduleSchema);

module.exports = schedule;
