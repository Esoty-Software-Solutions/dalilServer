const relationshipToSubscriberEnum = require("../schemas/relationshipToSubscriberEnumSchema");


exports.addrelationshipToSubscriberEnum = async (query) => {
  return await relationshipToSubscriberEnum.create(query);
};

exports.updaterelationshipToSubscriberEnum = async (query, data) => {
  return await relationshipToSubscriberEnum.findOneAndUpdate(query, data, {
    new: true,
  });
};


exports.getAllrelationshipToSubscriberEnum = async (query, limit, skip) => {
  return await relationshipToSubscriberEnum.find().skip(skip).limit(limit);
};

exports.getrelationshipToSubscriberEnum = async (query) => {
  return await relationshipToSubscriberEnum.findOne(query)
//   .select(
//     "-__v -createdAt -updatedAt"
//   );
};
