const { medicalFiles } = require("../schemas/subscriberSchema");

exports.createMedicalFile = async (query) => {
  return await medicalFiles.create(query);
};

exports.updateMedicalFile = async (query, data) => {
  return await medicalFiles.findByIdAndUpdate(query, data, { new: true });
};

exports.getMedicalFiles = async (filter) => {
  return await medicalFiles.find(filter);
};
