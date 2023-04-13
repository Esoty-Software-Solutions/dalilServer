const AccountStatusEnum = require("../schemas/accountStatusEnumSchema");


exports.addAccountStatusEnum = async (query) => {
  return await AccountStatusEnum.create(query);
};

exports.updateAccountStatusEnum = async (query, data) => {
  return await AccountStatusEnum.findOneAndUpdate(query, data, {
    new: true,
  });
};


exports.getAllAccountStatusEnum = async (query, limit, skip) => {
  return await AccountStatusEnum.find().skip(skip).limit(limit);
};

exports.getAccountStatusEnum = async (query) => {
  return await AccountStatusEnum.findOne(query)
};
