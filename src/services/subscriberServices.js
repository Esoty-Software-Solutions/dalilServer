const { subscribers, beneficiaries } = require("../schemas/subscriberSchema");
const { renameKey } = require("../utilities/replaceKey");

exports.createSubscriber = async (query) => {
  const renamedData = renameKey(query, ["gender" , "institution" , "city"] , ["genderId" , "institutionId" , "cityId"]);
  return await subscribers.create(renamedData);
};

exports.createBeneficiaries = async (query) => {
  const renamedData = renameKey(query, ["gender" , "relationshipToSubscriber"] , ["genderId" , "relationshipToSubscriberId"]);
  return await beneficiaries.create(renamedData);
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
  const renamedData = renameKey (data , ["institution" , "city"] , ["institutionId" , "cityId"]);
  return await subscribers.findOneAndUpdate(query, renamedData, { new: true });
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
