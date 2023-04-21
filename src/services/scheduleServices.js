const ScheduleSchema = require("../schemas/scheduleSchema");
const uploader = require("../utilities/uploader")
exports.createSchedule = async (query) => {
  console.log(query);
  return await ScheduleSchema.create(query);
};

exports.updateSchedule = async (query, data) => {
  return await ScheduleSchema.findOneAndUpdate(query, data, {
    new: true,
  })
    .populate("doctorId")
    .populate("medicalCenterId");
};

exports.deleteSchedule = async (query) => {
  return await ScheduleSchema.findOneAndDelete(query);
};

exports.getAllSchedules = async (query, limit, skip, sort) => {
  let objectsCount = await ScheduleSchema.find(query).count();

  let object = await ScheduleSchema
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .populate("medicalCenterId")
    .populate("doctorId")
    .lean();

  const updatedDocument = object.map(scheduleObject => {
    if(Object.keys(scheduleObject?.medicalCenterId).length) {
       const renamedKey = uploader.renameKey(scheduleObject.medicalCenterId,"city", "cityId");
       scheduleObject.medicalCenterId = renamedKey;
    }
    const updateMedicalKey = uploader.renameKey(scheduleObject,"medicalCenter", "medicalCenterId");
    
    const updateDoctorKey = uploader.renameKey(updateMedicalKey,"doctor", "doctorId");
    return updateDoctorKey;
  });
  
  return {updatedDocument, objectsCount};



  // return await ScheduleSchema.find(query)
  //   .populate("medicalCenterId")
  //   .populate("doctorId")
  //   .limit(limit)
  //   .select("-__v ");
};

exports.getScheduleDetails = async (query) => {
  return await ScheduleSchema.findOne(query)
    .populate("doctorId")
    .populate("medicalCenterId")
    .select("-__v -createdAt -updatedAt");
};
