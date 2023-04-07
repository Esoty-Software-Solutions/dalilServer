const RelationshipToBeneficiaryEnum = require("../schemas/relationshipToBeneficiaryEnumSchema");


exports.addRelationshipToBeneficiaryEnum = async (query) => {
  return await RelationshipToBeneficiaryEnum.create(query);
};

exports.updateRelationshipToBeneficiaryEnum = async (query, data) => {
  return await RelationshipToBeneficiaryEnum.findOneAndUpdate(query, data, {
    new: true,
  });
};


exports.getAllRelationshipToBeneficiaryEnum = async ({limit, skip}) => {
  return await RelationshipToBeneficiaryEnum.find().skip(skip).limit(limit);
};

exports.getRelationshipToBeneficiaryEnum = async (query) => {
  return await RelationshipToBeneficiaryEnum.findOne(query)
//   .select(
//     "-__v -createdAt -updatedAt"
//   );
};
