const AppointmentSchema = require("../schemas/appointmentSchema");
const { renameKey } = require("../utilities/replaceKey");

exports.createAppointment = async (query) => {
  const renamedDoc = renameKey(query, ["appointmentStatus", "timeSlot" , "beneficiary" , "schedule"], ["appointmentStatusId", "timeSlotId" , "beneficiaryId" , "scheduleId"]);
  return await AppointmentSchema.create(renamedDoc);
};

exports.updateAppointment = async (query, data) => {
  const renamedDoc = renameKey(data, ["appointmentStatus", "timeSlot" , "beneficiary" , "schedule"], ["appointmentStatusId", "timeSlotId" , "beneficiaryId" , "scheduleId"]);
  return await AppointmentSchema.findOneAndUpdate(query, renamedDoc, {
    new: true,
  }).select("-__v -createdAt -updatedAt");
};

exports.deleteAppointment = async (query) => {
  return await AppointmentSchema.findOneAndDelete(query);
};

exports.getAppointments = async (query, limit) => {
  console.log(JSON.stringify(query) , 123);
  return await AppointmentSchema.find(query).limit(limit).select("-__v");
};

exports.getAppointmentDetails = async (query) => {
  return await AppointmentSchema.findOne(query).select("-__v -createdAt -updatedAt");
};
