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
  let objectsCount = await MedicalServices.find(query).count();
  
  let object =  await MedicalServices.find(query).skip(skip).limit(limit).lean();

  return {objectsCount , object}
};

exports.getMedicalService = async (query) => {
  return await MedicalServices.findOne(query);
};
