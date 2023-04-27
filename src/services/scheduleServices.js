const ScheduleSchema = require("../schemas/scheduleSchema");
const { renameKey } = require("../utilities/replaceKey");
const mongoose = require('mongoose');
const uploader = require("../utilities/uploader")
exports.createSchedule = async (query) => {
  const renamedDoc = renameKey(query, ["medicalCenter", "doctor", "timeSlot"], ["medicalCenterId", "doctorId", "timeSlotId"]);
  return await ScheduleSchema.create(renamedDoc);
};

exports.updateSchedule = async (query, data) => {
  const renamedDoc = renameKey(data, ["medicalCenter", "doctor", "timeSlot"], ["medicalCenterId", "doctorId", "timeSlotId"]);
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

  return { updatedDocument, objectsCount };



  // return await ScheduleSchema.find(query)
  //   .populate("medicalCenterId")
  //   .populate("doctorId")
  //   .limit(limit)
  //   .select("-__v ");
};
exports.getAllSchedulesGroupBy = async (req, limit, skip, sort) => {
  try {
    
    let searchQuery = req.query.searchQuery;
    let medicalCenterId=req.query.medicalCenterId;
    let doctorId=req.query.doctorId;
    let city=req.query.city;
    let timeSlot=req.query.timeSlot;
    let specialty=req.query.specialty;
    let groupBy=req.query.groupBy;
    let query={};
     query["$and"]=[];
    if (medicalCenterId) {
      query["$and"].push({ "medicalCenter": { $eq: mongoose.Types.ObjectId(medicalCenterId) } });
    }
    if (doctorId) {
      query["$and"].push({ "doctor": { $eq: mongoose.Types.ObjectId(doctorId) } });
    }
    // City Filter
    if(city)
    {
        query["$and"].push({ "medicalCenterObject.city": { $eq: mongoose.Types.ObjectId(city) } });
    }
     // Time Slot
    if (timeSlot) {
        query["$and"].push({ timeSlot: { $eq: mongoose.Types.ObjectId(timeSlot) } });
    }

    if (specialty) {
        query["$and"].push({ "doctorObject.specialty": { $eq: mongoose.Types.ObjectId(specialty) } });
    }
    console.log(medicalCenterId);
    console.log(query);
   
    let groupByPipeLine='';
    // This is for list of schedule for doctor where they need data according medical center
    if(groupBy=="medicalCenter")
    {
      groupByPipeLine= {
        $group: {
          _id: "$medicalCenter",
          medicalCenter: { $first: "$medicalCenterObject" },
          doctor: { $first: "$doctorObject" },
          scheduleList: { $push: "$$ROOT" },
        }
      };
    }
    else{
      // This is for list of schedule for medical center where they need data according doctor
      groupByPipeLine=  {
        $group: {
          _id: "$doctor",
          medicalCenter: { $first: "$medicalCenterObject" },
          doctor: { $first: "$doctorObject" },         
          scheduleList: { $push: "$$ROOT" },
        }
      };
    }

    let documents = await ScheduleSchema.aggregate([    
      {
        $lookup: {
          from: `medicalcenters`,
          localField: `medicalCenter`,
          foreignField: `_id`,
          as: `medicalCenterObject`,
        },
      },
      {
        $lookup: {
          from: `doctors`,
          localField: `doctor`,
          foreignField: `_id`,
          as: `doctorObject`,
        },
      },
      {
        $match: {
          $and: query["$and"]
        },
      },
      groupByPipeLine,
      {"$limit":limit},
      {"$skip":skip}
      
    ]);
    console.log(documents);

    documents.forEach((document) => {
      document.doctor = document.doctor[0];
      document.medicalCenter = document.medicalCenter[0];
      document.scheduleList.forEach((document) => {
        document.medicalCenterObject = document.medicalCenterObject[0];
        document.doctorObject = document.doctorObject[0];
      });
    });
    let count = documents.length;

    let message = "good";
    if (documents.length === 0) {
      message = "list is empty change your query";
    }

    return { documents, count }
    // res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);

  }
};



exports.getScheduleDetails = async (query) => {
  return await ScheduleSchema.findOne(query)
    .populate("doctor")
    .populate("medicalCenter")
    .select("-__v -createdAt -updatedAt");
};
