const DoctorSchema = require("../schemas/doctorSchema");

exports.createDoctor = async (query) => {
  return await DoctorSchema.create(query);
};

exports.updateDoctor = async (query, data) => {
  return await DoctorSchema.findOneAndUpdate(query, data, {
    new: true,
  }).select("-__v -createdAt -updatedAt");
};

exports.deleteDoctor = async (query) => {
  return await DoctorSchema.findOneAndDelete(query);
};

exports.getDoctors = async (query, limit) => {
  return await DoctorSchema.find(query)
  .select("-__v");
};

exports.getDoctorDetails = async (query) => {
  return await DoctorSchema.findOne(query)
  .select("-__v -createdAt -updatedAt");
};
