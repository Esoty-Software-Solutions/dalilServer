import UserRoleSchema from "../schemas/userRoleSchema.js";

const createUserRole = async (query) => {
  return await UserRoleSchema.create(query);
};

const updateUserRole = async (query, data) => {
  return await UserRoleSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

const deleteUserRole = async (query) => {
  return await UserRoleSchema.findOneAndDelete(query);
};

const getAllUserRoles = async (query, limit) => {
  return await UserRoleSchema.find(query);
};

const getUserRoleDetails = async (query) => {
  return await UserRoleSchema.findOne(query).select(
    "-__v -createdAt -updatedAt"
  );
};
const UserRoleServices = {
  createUserRole,
  updateUserRole,
  getAllUserRoles,
  getUserRoleDetails,
  deleteUserRole,
};

export default UserRoleServices;
