const config = require("../config/config");
const PharmacySchema = require("../schemas/pharmacySchema");
const _ = require("lodash");
const uploader = require("../utilities/uploader");
const { renameKey } = require("../utilities/replaceKey");
exports.createPharmacy = async (query) => {
  const renamedData = renameKey(query , "city" , "cityId");
  const createdDoc = await PharmacySchema.create(renamedData);
  const doc = await uploader.returnedSingleDoc(PharmacySchema , createdDoc._id);
  return doc;
};

exports.updatePharmacy = async (query, data) => {
  const renamedData = renameKey(data , "city" , "cityId");
  return await PharmacySchema.findOneAndUpdate(query, renamedData, {
    new: true,
  });
};

exports.deletePharmacy = async (query) => {
  return await PharmacySchema.findOneAndDelete(query);
};

exports.getAllPharmacys = async (query, limit, skip) => {
  let objectsCount = await PharmacySchema.find(query).count();
  
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
    return data;
  }))
  return {objectsCount, newDocuments};
};

exports.getPharmacyDetails = async (query) => {
  const pharmacyDoc = await uploader.returnedSingleDoc(PharmacySchema , query);
  return pharmacyDoc;
};
// this function will make the presigned url and will change the cityId to city


