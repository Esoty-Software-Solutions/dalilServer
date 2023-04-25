const config = require("../config/config");
const InstitutionSchema = require("../schemas/institutionSchema");
const { renameKey } = require("../utilities/replaceKey");
const uploader = require("../utilities/uploader");
exports.createInstitution = async (query) => {
  const renamedData = renameKey(query , "city" , "cityId");
  const document = await InstitutionSchema.create(renamedData);
  const doc = await uploader.returnedSingleDoc(InstitutionSchema , document._id);
  return doc;
};

exports.updateInstitution = async (query, data) => {
  const renamedData = renameKey(data , "city" , "cityId");
  const updatedDocument =  await InstitutionSchema.findOneAndUpdate(query, renamedData, {new: true});
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
    return data; 
  }))

  return {objectsCount , newDocuments};
};

exports.getInstitutionDetails = async (query) => {
  const instDoc = await uploader.returnedSingleDoc(InstitutionSchema, query);
  return instDoc;
};
