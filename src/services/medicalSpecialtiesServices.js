const MedicalSpecialties = require("../schemas/medicalSpecialtiesSchema");


exports.addMedicalSpecialty = async (query) => {
  return await MedicalSpecialties.create(query);
};

exports.updateMedicalSpecialty = async (query, data) => {
  return await MedicalSpecialties.findOneAndUpdate(query, data, {
    new: true,
  });
};


exports.getAllMedicalSpecialties = async ({limit, skip}) => {
  return await MedicalSpecialties.find().select("-arabicName").skip(skip).limit(limit);
};

exports.getMedicalSpecialty = async (query) => {
  return await MedicalSpecialties.findOne(query).select("-arabicName")
};
