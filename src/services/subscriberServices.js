import { subscribers, beneficiaries } from "../schemas/subscriberSchema.js";

const createSubscriber = async (query) => {
  return await subscribers.create(query);
};

const createBeneficiaries = async (query) => {
  return await beneficiaries.create(query);
};

const updateBeneficiaries = async (query, data) => {
  return await beneficiaries.findByIdAndUpdate(query, data);
};

const updateSubscriber = async (query, data) => {
  return await subscribers.findOneAndUpdate(query, data);
};

const deleteSubscriber = async (query) => {
  return await subscribers.findOneAndDelete(query);
};

const getSubscribers = async (filter, sort, skip, limit) => {
  let documentsCount = await subscribers.find(filter).populate({
    path: "beneficiaries",
    populate: [
      {
        path: "medicalFiles",
        model: "medicalFiles",
      },
    ],
  });

  let documents = await subscribers
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .lean();

  return [documents, documentsCount];
};

const getSubscriber = async (query) => {
  return await subscribers.findOne(query).select("-__v");
};

const updateSubscriberById = async (query, data) => {
  return await subscribers
    .findOneAndUpdate(query, data)
    .select("-__v -createdAt -updatedAt");
};

const SubscriberServices = {
  createBeneficiaries,
  createSubscriber,
  updateBeneficiaries,
  updateSubscriber,
  updateSubscriberById,
  deleteSubscriber,
  getSubscriber,
  getSubscribers,
};

export default SubscriberServices;
