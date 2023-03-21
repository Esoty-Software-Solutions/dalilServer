import AppointmentSchema from "../schemas/appointmentSchema.js";

const createAppointment = async (query) => {
  return await AppointmentSchema.create(query);
};

const updateAppointment = async (query, data) => {
  return await AppointmentSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

const deleteAppointment = async (query) => {
  return await AppointmentSchema.findOneAndDelete(query);
};

const getAppointments = async (query, limit) => {
  return await AppointmentSchema.find(query)
    .populate("scheduleId")
    .populate("medicalCenterId")
    .populate("doctorId")
    .populate("userId")
    .limit(limit)
    .select("-__v");
};

const getAppointmentDetails = async (query) => {
  return await AppointmentSchema.findOne(query).select(
    "-__v -createdAt -updatedAt"
  );
};
const AppointmentServices = {
  createAppointment,
  updateAppointment,
  getAppointmentDetails,
  getAppointments,
  deleteAppointment,
};
export default AppointmentServices;
