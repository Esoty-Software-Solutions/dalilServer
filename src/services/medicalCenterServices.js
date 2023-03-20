import MedicalCenterSchema from "../schemas/medicalCenterSchema.js";

const createMedicalCenter = async (query) => {
  return await MedicalCenterSchema.create(query);
};

const updateMedicalCenter = async (query, data) => {
  return await MedicalCenterSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

const deleteMedicalCenter = async (query) => {
  return await MedicalCenterSchema.findOneAndDelete(query);
};

const getAllMedicalCenters = async (query, limit) => {
  return await MedicalCenterSchema.find(query).limit(limit).select("-__v ");
};

const getMedicalCenterDetails = async (query) => {
  return await MedicalCenterSchema.findOne(query).select(
    "-__v -createdAt -updatedAt"
  );
};

const MedicalCenterServices = {
  createMedicalCenter,
  updateMedicalCenter,
  getAllMedicalCenters,
  getMedicalCenterDetails,
  deleteMedicalCenter,
};

export default MedicalCenterServices;
