const doctor = require("../schemas/doctorSchema");
const medicalCenter = require("../schemas/medicalCenterSchema");
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

