const AppointmentStatusEnums = require("../schemas/appointmentStatusEnumsSchema");


exports.addAppointmentStatusEnums = async (query) => {
  return await AppointmentStatusEnums.create(query);
};

exports.updateAppointmentStatusEnums = async (query, data) => {
  return await AppointmentStatusEnums.findOneAndUpdate(query, data, {
    new: true,
  });
};


exports.getAllAppointmentStatusEnums = async ({limit, skip}) => {
  return await AppointmentStatusEnums.find().skip(skip).limit(limit);
};

exports.getAppointmentStatusEnums = async (query) => {
  return await AppointmentStatusEnums.findOne(query)
};
