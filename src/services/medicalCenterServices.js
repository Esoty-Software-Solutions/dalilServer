const MedicalCenterSchema = require("../schemas/medicalCenterSchema");

exports.createMedicalCenter = async (query) => {
  return await MedicalCenterSchema.create(query);
};

exports.updateMedicalCenter = async (query, data) => {
  return await MedicalCenterSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

exports.deleteMedicalCenter = async (query) => {
  return await MedicalCenterSchema.findOneAndDelete(query);
};

exports.getAllMedicalCenters = async (query, limit, skip) => {
  return await MedicalCenterSchema.find(query)
    .limit(limit)
    .skip(skip)
    .select("-__v ");
};

exports.getMedicalCenterDetails = async (query) => {
  return await MedicalCenterSchema.findOne(query).select(
    "-__v -createdAt -updatedAt"
  );
};
