const config = require("../config/config");
const PrescriptionSchema = require("../schemas/prescriptionSchema");
const uploader = require("../utilities/uploader");
exports.createPrescription = async (query) => {
  const createdDoc = await PrescriptionSchema.create(query);
  if (createdDoc?.fileLink?.length) {
    const presignedUrlArray = await Promise.all(
      createdDoc?.fileLink?.map((link) =>
        uploader.getPresignedUrl(link, config.dalilStorage_bucket),
      ),
    );
    createdDoc.fileLink = presignedUrlArray;
  }
  return createdDoc;
};

exports.updatePrescription = async (query, data) => {
  const updatedDocument = await PrescriptionSchema.findOneAndUpdate(
    query,
    data,
    { new: true },
  );

  if (updatedDocument?.fileLink.length) {
    const presignedUrlArray = await Promise.all(
      updatedDocument.fileLink.map(
        async (link) =>
          await uploader.getPresignedUrl(link, config.dalilStorage_bucket),
      ),
    );
    updatedDocument.fileLink = presignedUrlArray;
  }
  return updatedDocument;
};

exports.deletePrescription = async (query) => {
  return await PrescriptionSchema.findOneAndDelete(query);
};

exports.getAllPrescriptions = async (query, limit, skip) => {
  const medicalCenterDocuments = await PrescriptionSchema.find(query)
    .skip(skip)
    .limit(limit)
    .select("-__v ");

  const newDocuments = await Promise.all(
    medicalCenterDocuments.map(async (data) => {
      if (data?.fileLink.length) {
        const presignedUrlArray = await Promise.all(
          data.fileLink.map(
            async (link) =>
              await uploader.getPresignedUrl(link, config.dalilStorage_bucket),
          ),
        );
        data.fileLink = presignedUrlArray;
      }
      return data;
    }),
  );

  return newDocuments;
};

exports.getPrescriptionDetails = async (query) => {
  const singleDocument = await PrescriptionSchema.findOne(query).select(
    "-__v -createdAt -updatedAt",
  );
  if (singleDocument?.fileLink.length) {
    const presignedUrlArray = await Promise.all(
      singleDocument.fileLink.map(
        async (link) =>
          await uploader.getPresignedUrl(link, config.dalilStorage_bucket),
      ),
    );
    singleDocument.fileLink = presignedUrlArray;
  }
  return singleDocument;
};
