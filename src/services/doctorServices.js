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

exports.getDoctors = async (query, limit, skip) => {
  return await DoctorSchema.find(query).skip(skip).limit(limit).select("-__v");
};

exports.getDoctorDetails = async (query) => {
  return await DoctorSchema.findOne(query).select("-__v -createdAt -updatedAt");
};
