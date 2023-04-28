const AppointmentSchema = require("../schemas/appointmentSchema");
const { renameKey } = require("../utilities/replaceKey");

exports.createAppointment = async (query) => {
  const renamedDoc = renameKey(query, ["appointmentStatus", "timeSlot" , "beneficiary"], ["appointmentStatusId", "timeSlotId" , "beneficiaryId"]);
  return await AppointmentSchema.create(renamedDoc);
};

exports.updateAppointment = async (query, data) => {
  const renamedDoc = renameKey(data, ["appointmentStatus", "timeSlot" , "beneficiary"], ["appointmentStatusId", "timeSlotId" , "beneficiaryId"]);
  return await AppointmentSchema.findOneAndUpdate(query, renamedDoc, {
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
