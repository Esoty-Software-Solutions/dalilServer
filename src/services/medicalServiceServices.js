const MedicalServices = require("../schemas/medicalServicesSchema");


exports.addMedicalService = async (query) => {
  return await MedicalServices.create(query);
};

exports.updateMedicalService = async (query, data) => {
  return await MedicalServices.findOneAndUpdate(query, data, {
    new: true,
  });
};


exports.getAllMedicalServices = async (query, limit, skip) => {
  return await MedicalServices.find().skip(skip).limit(limit);
};

exports.getMedicalService = async (query) => {
  return await MedicalServices.findOne(query)
};
