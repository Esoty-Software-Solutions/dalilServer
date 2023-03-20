import InstitutionSchema from "../schemas/institutionSchema.js";

const createInstitution = async (query) => {
  return await InstitutionSchema.create(query);
};

const updateInstitution = async (query, data) => {
  return await InstitutionSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

const deleteInstitution = async (query) => {
  return await InstitutionSchema.findOneAndDelete(query);
};

const getAllInstitution = async () => {
  return await InstitutionSchema.find().sort({ _id: -1 }).select("-__v");
};

const getInstitutionDetails = async (query) => {
  return await InstitutionSchema.findOne(query).select(
    "-__v -createdAt -updatedAt"
  );
};

const InstitutionServices = {
  createInstitution,
  updateInstitution,
  getAllInstitution,
  getInstitutionDetails,
  deleteInstitution,
};
export default InstitutionServices;
