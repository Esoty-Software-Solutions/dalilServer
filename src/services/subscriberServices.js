const { subscribers, beneficiaries } = require("../schemas/subscriberSchema");

exports.createSubscriber = async (query) => {
  return await subscribers.create(query);
};

exports.createBeneficiaries = async (query) => {
  return await beneficiaries.create(query);
};

exports.updateSubscriber = async (query, data) => {
  return await subscribers.findOneAndUpdate(query, data, {
    new: true,
  });
};

exports.deleteSubscriber = async (query) => {
  return await subscribers.findOneAndDelete(query);
};

exports.getSubscribers = async (filter, sort, skip, limit) => {
  documentsCount = await subscribers.find(filter).count(sort);

  documents = await subscribers
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .lean();

  return [documents, documentsCount];
};

exports.getSubscriber = async (query) => {
  return await subscribers.findOne(query).select("-__v");
};

exports.updateSubscriberById = async (query, data) => {
  return await subscribers
    .findOneAndUpdate(query, data, {
      new: true,
    })
    .select("-__v -createdAt -updatedAt");
};
