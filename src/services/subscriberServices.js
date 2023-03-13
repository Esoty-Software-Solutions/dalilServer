const {
  subscribers,
  beneficiaries,
  medicalFiles,
} = require("../schemas/subscriberSchema");

exports.createSubscriber = async (query) => {
  return await subscribers.create(query);
};

exports.createBeneficiaries = async (query) => {
  return await beneficiaries.create(query);
};

exports.updateBeneficiaries = async (query, data) => {
  return await beneficiaries.findByIdAndUpdate(query, data);
};

exports.createMedicalFile = async (query) => {
  return await medicalFiles.create(query);
};

exports.updateSubscriber = async (query, data) => {
  return await subscribers.findOneAndUpdate(query, data);
};

exports.deleteSubscriber = async (query) => {
  return await subscribers.findOneAndDelete(query);
};

exports.getSubscribers = async (filter, sort, skip, limit) => {
  documentsCount = await subscribers.find(filter).populate({
    path: "beneficiaries",
    populate: [
      {
        path: "medicalFiles",
        model: "medicalFiles",
      },
    ],
  });

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
    .findOneAndUpdate(query, data)
    .select("-__v -createdAt -updatedAt");
};
