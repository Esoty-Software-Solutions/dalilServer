const config = require("../config/config");
const InstitutionSchema = require("../schemas/institutionSchema");
const uploader = require("../utilities/uploader");
exports.createInstitution = async (query) => {
  const document = await InstitutionSchema.create(query);
  const doc = await uploader.returnedSingleDoc(InstitutionSchema , document._id);
  return doc;
};

exports.updateInstitution = async (query, data) => {
  const updatedDocument =  await InstitutionSchema.findOneAndUpdate(query, data, {
    new: true,
  });
  if(updatedDocument?.fileLink.length) {
    const presignedUrlArray = await Promise.all(updatedDocument.fileLink.map(async link => await uploader.getPresignedUrl(link , config.dalilStorage_bucket)));
    updatedDocument.fileLink = presignedUrlArray;
  }
  return updatedDocument;
};

exports.deleteInstitution = async (query) => {
  return await InstitutionSchema.findOneAndDelete(query);
};

exports.getAllInstitution = async (query , limit, skip , sort) => {
  let objectsCount = await InstitutionSchema.find(query).count();

  let object = await InstitutionSchema
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .lean();

  const newDocuments = await Promise.all(object.map(async data => {
    if(data?.fileLink.length) {
      const presignedUrlArray = await Promise.all(data.fileLink.map(async link => await uploader.getPresignedUrl(link , config.dalilStorage_bucket)));
      data.fileLink = presignedUrlArray;
    }
    const renamedData = uploader.renameKey(data , "city" , "cityId");
    return renamedData; 
  }))

  return {objectsCount , newDocuments};
};

exports.getInstitutionDetails = async (query) => {
  const instDoc = await uploader.returnedSingleDoc(InstitutionSchema, query);
  return instDoc;
};
