// importing mongooose for citySchema and collection setup
const mongoose = require(`mongoose`);

// city schema setup
const citySchema = new mongoose.Schema({
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

const city = mongoose.model(`city`, citySchema);

module.exports = city;
