const AppointmentSchema = require("../schemas/appointmentSchema");

exports.createOne = async (schemaName, query, skip, limit, select) => {
  return await AppointmentSchema.create(query);
};

exports.updateOne = async (query, data) => {
  return await AppointmentSchema.findOneAndUpdate(query, data, {
    new: true,
  }).select("-__v -createdAt -updatedAt");
};

exports.deleteAppointment = async (query) => {
  return await AppointmentSchema.findOneAndDelete(query);
};

exports.getAppointments = async (query, limit) => {
  return await AppointmentSchema.find(query).limit(limit).select("-__v");
};

exports.getAppointmentDetails = async (query) => {
  return await AppointmentSchema.findOne(query)
    .populate("beneficiaryId")
    .populate("scheduleId")
    .populate("doctorId")
    .select("-__v -createdAt -updatedAt");
};
