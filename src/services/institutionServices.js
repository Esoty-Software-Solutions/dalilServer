const InstitutionSchema = require("../schemas/institutionSchema");
const uploader = require("../utilities/uploader");
exports.createInstitution = async (query) => {
  const document = await InstitutionSchema.create(query);
  const finalDocument = await uploader.assignedPresignedUrlSingle(document);
  return finalDocument;
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
  const document = await InstitutionSchema.find().sort({ _id: -1 }).select("-__v");
  const finalDocument = uploader.allDocumentsPresignedUrl(document);
  return finalDocument;
};

exports.getInstitutionDetails = async (query) => {
  const document =  await InstitutionSchema.findOne(query).select(
    "-__v -createdAt -updatedAt"
  );
  const finalDocument = await uploader.assignedPresignedUrlSingle(document);
  return finalDocument;
};
