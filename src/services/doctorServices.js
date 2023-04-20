const DoctorSchema = require("../schemas/doctorSchema");
const uploader = require("../utilities/uploader");
exports.createDoctor = async (query) => {
  const createDoctor = await DoctorSchema.create(query);
  // const leanObject = await this.getDoctorDetails({_id : createDoctor._id});
  const leanObject = createDoctor.toObject({ getters: true });
  // console.log("before renaming" , leanObject);
  const renamedData = uploader.renameKey(leanObject , "specialty" , "specialtyId");
  // console.log("after renaming" , renamedData)
  return renamedData;
  
};

exports.updateDoctor = async (query, data) => {
  return await DoctorSchema.findOneAndUpdate(query, data, {
    new: true,
  }).select("-__v -createdAt -updatedAt");
};

exports.deleteDoctor = async (query) => {
  return await DoctorSchema.findOneAndDelete(query);
};

exports.getDoctors = async (query, limit, skip) => {
  return await DoctorSchema.find(query).skip(skip).limit(limit).select("-__v");
};

exports.getDoctorDetails = async (query) => {

  const returnedDoc =  await DoctorSchema.findOne(query).select("-__v -createdAt -updatedAt").lean();
  const renamedData = uploader.renameKey(returnedDoc , "specialty" , "specialtyId");
  return renamedData;
};
