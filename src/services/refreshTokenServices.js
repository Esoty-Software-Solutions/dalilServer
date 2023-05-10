const RefreshToken = require("../schemas/refreshTokenSchema");

exports.saveToken = async (query) => {
  return await RefreshToken.create(query);
};
exports.verifyRefreshToken = async (query) => {
  return await RefreshToken.find(query);
};

exports.updateRefreshToken = async ( data) => {
  try {
    if(data){
     return await RefreshToken.updateOne({ userId: data.userId }, data);
    }
  } catch (err) {
    return err
  }
};
