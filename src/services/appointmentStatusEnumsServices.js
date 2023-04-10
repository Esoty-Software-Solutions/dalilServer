const appointmentStatusEnums = require("../schemas/appointmentStatusEnumsSchema");


exports.addappointmentStatusEnums = async (query) => {
  return await appointmentStatusEnums.create(query);
};

exports.updateappointmentStatusEnums = async (query, data) => {
  return await appointmentStatusEnums.findOneAndUpdate(query, data, {
    new: true,
  });
};


exports.getAllappointmentStatusEnums = async ({limit, skip}) => {
  return await appointmentStatusEnums.find().skip(skip).limit(limit);
};

exports.getappointmentStatusEnums = async (query) => {
  return await appointmentStatusEnums.findOne(query)
};
