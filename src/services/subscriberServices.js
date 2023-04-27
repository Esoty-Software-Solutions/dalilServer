const { subscribers, beneficiaries } = require("../schemas/subscriberSchema");

exports.createSubscriber = async (query) => {
  return await subscribers.create(query);
};

exports.createBeneficiaries = async (query) => {
  return await beneficiaries.create(query);
};

exports.updateBeneficiaries = async (query, data) => {
  return await beneficiaries.findByIdAndUpdate(query, data);
};

exports.getBeneficiary = async (query, data) => {
  return await beneficiaries.findOne(query);
};

exports.updateBeneficiary = async (query, data) => {
  return await beneficiaries.findOneAndUpdate(query, data, { new: true });
};

exports.insertManyBeneficiaries = async (query) => {
  return await beneficiaries.insertMany(query);
};

exports.updateSubscriber = async (query, data) => {
  return await subscribers.findOneAndUpdate(query, data, { new: true });
};

exports.insertManySubscribers = async (query) => {
  return await subscribers.insertMany(query);
};

exports.deleteSubscriber = async (query) => {
  return await subscribers.findOneAndDelete(query);
};

exports.getSubscribers = async (filter, sort, skip, limit) => {
  documentsCount = await subscribers.find(filter).count();

  documents = await subscribers
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .lean()
    .populate({
      path: "beneficiaries",
      populate: [
        {
          path: "medicalFiles",
          model: "medicalFiles",
        },
      ],
    });

  return [documents, documentsCount];
};

exports.getSubscriber = async (query) => {
  return await subscribers.findOne(query).select("-__v");
};

exports.updateSubscriberById = async (query, data) => {
  return await subscribers
    .findOneAndUpdate(query, data)
    .select("-__v -createdAt -updatedAt");
};
