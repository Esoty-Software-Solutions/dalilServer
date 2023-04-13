const config = require("../config/config");
const InstitutionSchema = require("../schemas/institutionSchema");
const uploader = require("../utilities/uploader");
exports.createInstitution = async (query) => {
  const document = await InstitutionSchema.create(query);
  const doc = await uploader.returnedSingleDoc(InstitutionSchema , document._id);
  return doc;
};

exports.updateInstitution = async (query, data) => {
  return await InstitutionSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

exports.deleteInstitution = async (query) => {
  return await InstitutionSchema.findOneAndDelete(query);
};

exports.getAllInstitution = async () => {
  const document = await InstitutionSchema
  .find()
  .sort({ _id: -1 })
  .select("-__v");

  const newDocuments = await Promise.all(document.map(async data => {
    if(data?.fileLink.length) {
      const presignedUrlArray = await Promise.all(data.fileLink.map(async link => await uploader.getPresignedUrl(link , config.dalilStorage_bucket)));
      data.fileLink = presignedUrlArray;
    }
    const renamedData = uploader.renameKey(data , "city" , "cityId");
    return renamedData; 
  }))

  // const finalDocument = uploader.allDocumentsPresignedUrl(document);
  return newDocuments;
};

exports.getInstitutionDetails = async (query) => {
  const instDoc = await uploader.returnedSingleDoc(InstitutionSchema, query);
  return instDoc;
};
