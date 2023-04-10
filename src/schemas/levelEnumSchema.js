// importing mongooose for levelSchema and collection setup
const mongoose = require(`mongoose`);

// level schema setup
const levelSchema = new mongoose.Schema({
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

const Level = mongoose.model(`level`, levelSchema);

module.exports = Level;
