// importing mongooose for timeSlotEnumSchema and collection setup
const mongoose = require(`mongoose`);

// timeSlotEnum schema setup
const timeSlotEnumSchema = new mongoose.Schema(
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

const TimeSlotEnum  = mongoose.model(`timeSlotEnum`, timeSlotEnumSchema);

module.exports = TimeSlotEnum ;
