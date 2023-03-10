const subscriberSchema = require("../schemas/subscriberSchema");

exports.createSubscriber = async (query) => {
  return await subscriberSchema.create(query);
};

exports.createBeneficiaries = async (query) => {
  return await beneficiaries.create(query);
};

exports.updateSubscriber = async (query, data) => {
  return await subscriberSchema.findOneAndUpdate(query, data);
};

exports.deleteSubscriber = async (query) => {
  return await subscriberSchema.findOneAndDelete(query);
};

exports.getSubscribers = async (filter, sort, skip, limit) => {
  documentsCount = await subscriberSchema.find(filter);

  documents = await subscriberSchema
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .lean();

  return [documents, documentsCount];
};

exports.getSubscriber = async (query) => {
  return await subscriberSchema.findOne(query).select("-__v");
};

exports.updateSubscriberById = async (query, data) => {
  return await subscriberSchema
    .findOneAndUpdate(query, data)
    .select("-__v -createdAt -updatedAt");
};
