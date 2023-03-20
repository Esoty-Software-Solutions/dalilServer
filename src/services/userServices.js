import UserSchema from "../schemas/userSchema.js";

const createUser = async (query) => {
  return await UserSchema.create(query);
};

const updateUser = async (query, data) => {
  return await UserSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

const deleteUser = async (query) => {
  return await UserSchema.findOneAndDelete(query);
};

const getUsers = async (filter, sort, skip, limit) => {
  let documentsCount = await UserSchema.find(filter).count(sort);

  let documents = await UserSchema.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select("-__v -password")
    .lean();
  return [documents, documentsCount];
};

const getUser = async (query) => {
  return await UserSchema.findOne(query).select("-__v");
};

const updateUserById = async (query, data) => {
  return await UserSchema.findOneAndUpdate(query, data, {
    new: true,
  }).select("-__v -createdAt -updatedAt");
};

const UserServices = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateUserById,
  deleteUser,
};

export default UserServices;
