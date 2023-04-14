const config = require("../config/config");
const PharmacySchema = require("../schemas/pharmacySchema");
const _ = require("lodash");
const uploader = require("../utilities/uploader");
exports.createPharmacy = async (query) => {
  const createdDoc = await PharmacySchema.create(query);
  const doc = await uploader.returnedSingleDoc(PharmacySchema , createdDoc._id);
  return doc;
};

exports.updatePharmacy = async (query, data) => {
  return await PharmacySchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

exports.deletePharmacy = async (query) => {
  return await PharmacySchema.findOneAndDelete(query);
};

exports.getAllPharmacys = async (query, limit, skip) => {
  const pharmacyDocuments = await PharmacySchema.find(query)
    .skip(skip)
    .limit(limit)
    .select("-__v ")
    .lean();
    
  const newDocuments = await Promise.all(pharmacyDocuments.map(async data => {
    if(data?.fileLink.length) {
      const presignedUrlArray = await Promise.all(data.fileLink.map(async link => await uploader.getPresignedUrl(link , config.dalilStorage_bucket)));
      data.fileLink = presignedUrlArray;
    }
    const renamedData = uploader.renameKey(data , "city" , "cityId");
    return renamedData;
  }))

  return newDocuments;
};

exports.getPharmacyDetails = async (query) => {
    console.log(query)
  const pharmacyDoc = await uploader.returnedSingleDoc(PharmacySchema , query);
  return pharmacyDoc;
};
// this function will make the presigned url and will change the cityId to city


