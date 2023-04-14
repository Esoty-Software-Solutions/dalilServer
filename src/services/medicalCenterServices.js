const config = require("../config/config");
const MedicalCenterSchema = require("../schemas/medicalCenterSchema");
const _ = require("lodash");
const uploader = require("../utilities/uploader");
exports.createMedicalCenter = async (query) => {
  const createdDoc = await MedicalCenterSchema.create(query);
  const doc = await uploader.returnedSingleDoc(MedicalCenterSchema , createdDoc._id);
  return doc;
};

exports.updateMedicalCenter = async (query, data) => {
  return await MedicalCenterSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

exports.deleteMedicalCenter = async (query) => {
  return await MedicalCenterSchema.findOneAndDelete(query);
};

exports.getAllMedicalCenters = async (query, limit, skip) => {
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
    const renamedData = uploader.renameKey(data , "city" , "cityId");
    return renamedData;
  }))

  return newDocuments;
};

exports.getMedicalCenterDetails = async (query) => {
  const medicalDoc = await uploader.returnedSingleDoc(MedicalCenterSchema , query);
  return medicalDoc;
};


