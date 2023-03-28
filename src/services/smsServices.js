const SmsSchema = require("../schemas/smsSchema");

exports.createSms = async (query) => {
  return await SmsSchema.create(query);
};

exports.updateSms = async (query, data) => {
  return await SmsSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

exports.deleteSms = async (query) => {
  return await SmsSchema.findOneAndDelete(query);
};

exports.getAllSms = async (query, limit) => {
  return await SmsSchema.find(query).limit(limit).select("-__v ");
};

exports.getSmsDetails = async (query) => {
  return await SmsSchema.findOne(query).select("-__v -createdAt -updatedAt");
};
