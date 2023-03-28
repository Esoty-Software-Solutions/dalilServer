const AppointmentSchema = require("../schemas/appointmentSchema");

exports.createAppointment = async (query) => {
  return await AppointmentSchema.create(query);
};

exports.updateAppointment = async (query, data) => {
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
  return await AppointmentSchema.findOne(query).select(
    "-__v -createdAt -updatedAt"
  );
};
