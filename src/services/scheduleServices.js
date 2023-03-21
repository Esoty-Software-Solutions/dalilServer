import ScheduleSchema from "../schemas/scheduleSchema.js";

const createSchedule = async (query) => {
  return await ScheduleSchema.create(query);
};

const updateSchedule = async (query, data) => {
  return await ScheduleSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

const deleteSchedule = async (query) => {
  return await ScheduleSchema.findOneAndDelete(query);
};

const getAllSchedules = async (query, limit) => {
  return await ScheduleSchema.find(query)
    .populate("medicalCenterId")
    .populate("doctorId")
    .limit(limit)
    .select("-__v ");
};

const getScheduleDetails = async (query) => {
  return await ScheduleSchema.findOne(query).select(
    "-__v -createdAt -updatedAt"
  );
};

const ScheduleServices = {
  createSchedule,
  updateSchedule,
  getAllSchedules,
  getScheduleDetails,
  deleteSchedule,
};
export default ScheduleServices;
