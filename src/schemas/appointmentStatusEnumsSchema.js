// importing mongooose for appointmentStatusEnumsSchema and collection setup
const mongoose = require(`mongoose`);

// appointmentStatusEnums schema setup
const appointmentStatusEnumsSchema = new mongoose.Schema(
  {
    backendName: {
      type: String,
      required: [true, `Please enter valid  BackendName`]
    },
    arabicName: {
      type: String,
      required: [true, `Please enter valid  ArabicName`]
    },
    englishName: {
      type: String,
      required: [true, `Please enter valid  EnglishName`]
    },
  }
);

const AppointmentStatusEnums  = mongoose.model(`appointmentStatusEnums`, appointmentStatusEnumsSchema);

module.exports = AppointmentStatusEnums ;
