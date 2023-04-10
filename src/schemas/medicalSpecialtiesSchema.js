// importing mongooose for medicalSpecialtiesSchema and collection setup
const mongoose = require(`mongoose`);

// medicalSpecialties schema setup
const medicalSpecialtiesSchema = new mongoose.Schema(
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

const MedicalSpecialties  = mongoose.model(`medicalSpecialties`, medicalSpecialtiesSchema);

module.exports = MedicalSpecialties ;
