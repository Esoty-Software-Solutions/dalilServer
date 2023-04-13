const genderEnum = require("../schemas/genderEnumSchema");


exports.addgenderEnum = async (query) => {
  return await genderEnum.create(query);
};

exports.updategenderEnum = async (query, data) => {
  return await genderEnum.findOneAndUpdate(query, data, {
    new: true,
  });
};


exports.getAllgenderEnum = async ({limit, skip}) => {
  return await genderEnum.find().skip(skip).limit(limit);
};

exports.getgenderEnum = async (query) => {
  return await genderEnum.findOne(query)
};
