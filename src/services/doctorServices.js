const DoctorSchema = require("../schemas/doctorSchema");
const { renameKey } = require("../utilities/replaceKey");
exports.createDoctor = async (query) => {
  const renamedData = renameKey(query , "specialty" , "specialtyId");
  const createDoctor = await DoctorSchema.create(renamedData);
  return createDoctor;
};

exports.updateDoctor = async (query, data) => {
  const renamedData = renameKey(data , "specialty" , "specialtyId");
  return await DoctorSchema.findOneAndUpdate(query, renamedData, {
    new: true,
  }).select("-__v -createdAt -updatedAt");
};

exports.deleteDoctor = async (query) => {
  return await DoctorSchema.findOneAndDelete(query);
};

exports.getDoctors = async (query, limit, skip , sort) => {
  let objectsCount = await DoctorSchema.find(query).count();

  let object = await DoctorSchema
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .lean();
  return {object, objectsCount};
};

exports.getDoctorDetails = async (query) => {
  const returnedDoc =  await DoctorSchema.findOne(query).select("-__v -createdAt -updatedAt").lean();
  return returnedDoc;
};
