// importing mongooose for relationshipToBeneficiaryEnumSchema and collection setup
const mongoose = require(`mongoose`);

// relationshipToBeneficiaryEnum schema setup
const relationshipToBeneficiaryEnumSchema = mongoose.Schema(
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

const RelationshipToBeneficiaryEnum  = mongoose.model(`relationshipToBeneficiaryEnum`, relationshipToBeneficiaryEnumSchema);

module.exports = RelationshipToBeneficiaryEnum ;
