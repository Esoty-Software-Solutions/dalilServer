const ScheduleSchema = require("../schemas/scheduleSchema");
const { renameKey } = require("../utilities/replaceKey");
const uploader = require("../utilities/uploader")
exports.createSchedule = async (query) => {
  const renamedDoc = renameKey (query , ["medicalCenter" , "doctor" , "timeSlot"] , ["medicalCenterId","doctorId","timeSlotId"]);
  return await ScheduleSchema.create(renamedDoc);
};

exports.updateSchedule = async (query, data) => {
  const renamedDoc = renameKey (data , ["medicalCenter" , "doctor" , "timeSlot"] , ["medicalCenterId","doctorId","timeSlotId"]);
  return await ScheduleSchema.findOneAndUpdate(query, renamedDoc, {
    new: true,
  })
};

exports.deleteSchedule = async (query) => {
  return await ScheduleSchema.findOneAndDelete(query);
};

exports.getAllSchedules = async (query, limit, skip, sort) => {
  let objectsCount = await ScheduleSchema.find(query).count();

  let updatedDocument = await ScheduleSchema
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .populate("medicalCenter")
    .populate("doctor")
    .lean();

  // const updatedDocument = object.map(scheduleObject => {
  //   if(Object.keys(scheduleObject?.medicalCenterId).length) {
  //      const renamedKey = uploader.renameKey(scheduleObject.medicalCenterId,"city", "cityId");
  //      scheduleObject.medicalCenterId = renamedKey;
  //   }
  //   const updateMedicalKey = uploader.renameKey(scheduleObject,"medicalCenter", "medicalCenterId");
    
  //   const updateDoctorKey = uploader.renameKey(updateMedicalKey,"doctor", "doctorId");
  //   return updateDoctorKey;
  // });
  
  return {updatedDocument, objectsCount};



  // return await ScheduleSchema.find(query)
  //   .populate("medicalCenterId")
  //   .populate("doctorId")
  //   .limit(limit)
  //   .select("-__v ");
};

exports.getScheduleDetails = async (query) => {
  return await ScheduleSchema.findOne(query)
    .populate("doctor")
    .populate("medicalCenter")
    .select("-__v -createdAt -updatedAt");
};
