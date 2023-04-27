const config = require("../config/config");
const MedicalCenterSchema = require("../schemas/medicalCenterSchema");
const _ = require("lodash");
const { renameKey, removeKey } = require("../utilities/replaceKey");
const { renameKey, removeKey } = require("../utilities/replaceKey");
const uploader = require("../utilities/uploader");
exports.createMedicalCenter = async (query) => {
  const renamedData = renameKey(query , "city" , "cityId");
  const createdDoc = await MedicalCenterSchema.create(renamedData);
  const doc = await uploader.returnedSingleDoc(MedicalCenterSchema , createdDoc._id);
  return doc;
};

exports.updateMedicalCenter = async (query, data) => {
  const renamedData = renameKey(data , "city" , "cityId");
  const updatedData = await MedicalCenterSchema.findOneAndUpdate(query, renamedData, {
    new: true,
    lean : true
  });
  const finalData = removeKey(updatedData , "fileLink");
  return finalData;
};

exports.deleteMedicalCenter = async (query) => {
  return await MedicalCenterSchema.findOneAndDelete(query);
};

exports.getAllMedicalCenters = async (query, limit, skip) => {
  let objectsCount = await MedicalCenterSchema.find(query).count();
  
  const medicalCenterDocuments = await MedicalCenterSchema.find(query)
    .skip(skip)
    .limit(limit)
    .select("-__v ")
    .lean();
    
  const newDocuments = await Promise.all(medicalCenterDocuments.map(async data => {
    if(data?.fileLink.length) {
      const presignedUrlArray = await Promise.all(data.fileLink.map(async link => await uploader.getPresignedUrl(link , config.dalilStorage_bucket)));
      data.fileLink = presignedUrlArray;
    }
    return data;
  }))
  return {objectsCount , newDocuments};
};

exports.getMedicalCenterDetails = async (query) => {
  const medicalDoc = await uploader.returnedSingleDoc(MedicalCenterSchema , query);
  return medicalDoc;
};


