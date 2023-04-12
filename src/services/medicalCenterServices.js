const config = require("../config/config");
const MedicalCenterSchema = require("../schemas/medicalCenterSchema");
const uploader = require("../utilities/uploader");
exports.createMedicalCenter = async (query) => {
  const createdDoc = await MedicalCenterSchema.create(query);
  if(createdDoc?.fileLink?.length) {
    const presignedUrlArray = await Promise.all(createdDoc?.fileLink?.map(link => uploader.getPresignedUrl(link, config.dalilStorage_bucket)));
    createdDoc.fileLink = presignedUrlArray;
  }
  return createdDoc;
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
    .select("-__v ");
    
  const newDocuments = await Promise.all(medicalCenterDocuments.map(async data => {
    if(data?.fileLink.length) {
      const presignedUrlArray = await Promise.all(data.fileLink.map(async link => await uploader.getPresignedUrl(link , config.dalilStorage_bucket)));
      data.fileLink = presignedUrlArray;
    }
    return data;
  }))

  return newDocuments;
};

exports.getMedicalCenterDetails = async (query) => {
  const singleDocument = await MedicalCenterSchema.findOne(query).select(
    "-__v -createdAt -updatedAt"
  );
  if(singleDocument?.fileLink.length) {
    const presignedUrlArray = await Promise.all(singleDocument.fileLink.map(async link => await uploader.getPresignedUrl(link , config.dalilStorage_bucket)));
    singleDocument.fileLink = presignedUrlArray;
  }
  return singleDocument;
};
