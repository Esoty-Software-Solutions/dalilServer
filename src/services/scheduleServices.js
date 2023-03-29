const ScheduleSchema = require("../schemas/scheduleSchema");

exports.createSchedule = async (query) => {
  return await ScheduleSchema.create(query);
};

exports.updateSchedule = async (query, data) => {
  return await ScheduleSchema.findOneAndUpdate(query, data, {
    new: true,
  });
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
  return await ScheduleSchema.findOne(query).select(
    "-__v -createdAt -updatedAt"
  );
};
