// importing mongooose for relationshipToBeneficiaryEnumSchema and collection setup
const mongoose = require(`mongoose`);

// relationshipToBeneficiaryEnum schema setup
const relationshipToBeneficiaryEnumSchema = mongoose.Schema(
  {
    backendName: {
      type: String,
      required: [true, `please enter valid  name`],
      default: null
    },
    arabicName: String,
    englishName: String,
  }
);

const RelationshipToBeneficiaryEnum  = mongoose.model(`relationshipToBeneficiaryEnum`, relationshipToBeneficiaryEnumSchema);

module.exports = RelationshipToBeneficiaryEnum ;
