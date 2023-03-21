import { medicalFiles } from "../schemas/subscriberSchema.js";

const createMedicalFile = async (query) => {
  return await medicalFiles.create(query);
};

const updateMedicalFile = async (query, data) => {
  return await medicalFiles.findByIdAndUpdate(query, data, { new: true });
};

const getMedicalFiles = async (filter) => {
  return await medicalFiles.find(filter);
};

const MedicalFilesServices = {
  createMedicalFile,
  updateMedicalFile,
  getMedicalFiles,
};

export default MedicalFilesServices;
