const ScheduleSchema = require("../schemas/scheduleSchema");

exports.createSchedule = async (query) => {
  return await ScheduleSchema.create(query);
};

exports.updateSchedule = async (query, data) => {
  return await ScheduleSchema.findOneAndUpdate(query, data, {
    new: true,
  })
    .populate("doctorId")
    .populate("medicalCenterId");
};

exports.deleteSchedule = async (query) => {
  return await ScheduleSchema.findOneAndDelete(query);
};

exports.getAllSchedules = async (query, limit) => {
  return await ScheduleSchema.find(query)
    .populate("medicalCenterId")
    .populate("doctorId")
    .limit(limit)
    .select("-__v ");
};

exports.getScheduleDetails = async (query) => {
  return await ScheduleSchema.findOne(query)
    .populate("doctorId")
    .populate("medicalCenterId")
    .select("-__v -createdAt -updatedAt");
};
