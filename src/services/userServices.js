const UserSchema = require("../schemas/userSchema");

exports.createUser = async (query) => {
  return await UserSchema.create(query);
};

exports.updateUser = async (query, data) => {
  return await UserSchema.findOneAndUpdate(query, data, {
    new: true,
  }).select("-__v -password");
};

exports.deleteUser = async (query) => {
  return await UserSchema.findOneAndDelete(query);
};

exports.getUsers = async (filter, sort, skip, limit) => {
  documentsCount = await UserSchema.find(filter)
    .select("-__v -password")
    .count(sort);

  documents = await UserSchema.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select("-__v -password")
    .lean();
  return [documents, documentsCount];
};

exports.getUser = async (query) => {
  return await UserSchema.findOne(query).select("-__v");
};

exports.updateUserById = async (query, data) => {
  return await UserSchema.findOneAndUpdate(query, data, {
    new: true,
  }).select("-__v -createdAt -updatedAt");
};
