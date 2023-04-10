// importing mongooose for genderSchema and collection setup
const mongoose = require(`mongoose`);

// gender schema setup
const genderSchema = new mongoose.Schema({
  backendName: {
    type: String,
    required: [true, `Please enter valid  BackendName`],
  },
  arabicName: {
    type: String,
    required: [true, `Please enter valid  ArabicName`],
  },
  englishName: {
    type: String,
    required: [true, `Please enter valid  EnglishName`],
  },
});

const Gender = mongoose.model(`gender`, genderSchema);

module.exports = Gender;
