// importing mongooose for accountStatusEnumSchema and collection setup
const mongoose = require(`mongoose`);

// accountStatusEnum schema setup
const accountStatusEnumSchema = new mongoose.Schema(
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

const AccountStatusEnum  = mongoose.model(`accountStatusEnum`, accountStatusEnumSchema);

module.exports = AccountStatusEnum ;
