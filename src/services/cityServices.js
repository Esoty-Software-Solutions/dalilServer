const City = require("../schemas/citySchema");

exports.addCity = async (query) => {
  return await City.create(query);
};

exports.updateCity = async (query, data) => {
  return await City.findOneAndUpdate(query, data, {
    new: true,
  });
};

exports.getAllCity = async (query, { limit, skip }) => {
  return await City.find(query).skip(skip).limit(limit);
};

exports.getCity = async (query) => {
  return await City.findOne(query);
};
