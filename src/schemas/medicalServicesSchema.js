// importing mongooose for medicalServicesSchema and collection setup
const mongoose = require(`mongoose`);

// medicalServices schema setup
const medicalServicesSchema = new mongoose.Schema(
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

const MedicalServices  = mongoose.model(`medicalServices`, medicalServicesSchema);

module.exports = MedicalServices ;
