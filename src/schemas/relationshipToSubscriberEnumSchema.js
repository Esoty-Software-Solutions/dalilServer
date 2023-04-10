// importing mongooose for relationshipToSubscriberEnumSchema and collection setup
const mongoose = require(`mongoose`);

// relationshipToSubscriberEnum schema setup
const relationshipToSubscriberEnumSchema = mongoose.Schema(
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

const relationshipToSubscriberEnum  = mongoose.model(`relationshipToSubscriberEnum`, relationshipToSubscriberEnumSchema);

module.exports = relationshipToSubscriberEnum ;
