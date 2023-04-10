const timeSlotEnum = require("../schemas/timeSlotEnumSchema");


exports.addTimeSlotEnum = async (query) => {
  return await timeSlotEnum.create(query);
};

exports.updateTimeSlotEnum = async (query, data) => {
  return await timeSlotEnum.findOneAndUpdate(query, data, {
    new: true,
  });
};


exports.getAllTimeSlotEnum = async ({limit, skip}) => {
  return await timeSlotEnum.find().select("-arabicName").skip(skip).limit(limit);
};

exports.getTimeSlotEnum = async (query) => {
  return await timeSlotEnum.findOne(query).select("-arabicName")
};
