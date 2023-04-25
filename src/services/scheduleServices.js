const doctor = require("../schemas/doctorSchema");
const medicalCenter = require("../schemas/medicalCenterSchema");
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
    console.log(object)

  const updatedDocument = object.map(scheduleObject => {
    let finalKey=scheduleObject.medicalCenterId ? scheduleObject.medicalCenterId :(scheduleObject.medicalCenter ? scheduleObject.medicalCenter : '');
    console.log(finalKey);
    // console.log(Object.keys(scheduleObject?.medicalCenterId).length)
   if(Object.keys(finalKey).length) {
       const renamedKey = uploader.renameKey(finalKey,"city", "cityId");
       scheduleObject.medicalCenterId = renamedKey;
    } 
    const updateMedicalKey = uploader.renameKey(scheduleObject,"medicalCenter", "medicalCenterId");
    
    const updateDoctorKey = uploader.renameKey(updateMedicalKey,"doctor", "doctorId");
    return updateDoctorKey;
  });
  
  return {updatedDocument, objectsCount};
};

exports.getScheduleDetails = async (query) => {
  return await ScheduleSchema.findOne(query)
    .populate("doctor")
    .populate("medicalCenter")
    .select("-__v -createdAt -updatedAt");
};
// created by chetan according to old response
exports.getAllSchedulesNew = async (query, limit, skip, sort) => {
  console.log("here");
  let medicalCenterDetail=await medicalCenter.findById(query.medicalCenterId);

  let objectsCount = await ScheduleSchema.find(query).count();
  let doctorIds = await ScheduleSchema.find(query).distinct("doctorId");
   let newDocuments=[];
   console.log(doctorIds,"doctorIds")
  for (const iterator of doctorIds) {
    let doctorDetail=await doctor.findById(iterator);
    query.doctorId=iterator;
    let object = await ScheduleSchema
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .populate("medicalCenterId")
    .populate("doctorId")
    .lean();
    let updatedDocument = object.map(scheduleObject => {
      let finalKey=scheduleObject.medicalCenterId ? scheduleObject.medicalCenterId :(scheduleObject.medicalCenter ? scheduleObject.medicalCenter : '');
      // console.log(finalKey);
      // console.log(Object.keys(scheduleObject?.medicalCenterId).length)
     if(Object.keys(finalKey).length) {
         const renamedKey = uploader.renameKey(finalKey,"city", "cityId");
         scheduleObject.medicalCenterId = renamedKey;
      } 
      const updateMedicalKey = uploader.renameKey(scheduleObject,"medicalCenter", "medicalCenterId");
      
      const updateDoctorKey = uploader.renameKey(updateMedicalKey,"doctor", "doctorId");
      return updateDoctorKey;
    });
    newDocuments.push({"scheduleList":updatedDocument,"doctor":doctorDetail,"medicalCenter":medicalCenterDetail});
    
  }
 
    // console.log(object)

  
  
  return {newDocuments, objectsCount,medicalCenterDetail};



  // return await ScheduleSchema.find(query)
  //   .populate("medicalCenterId")
  //   .populate("doctorId")
  //   .limit(limit)
  //   .select("-__v ");
};

