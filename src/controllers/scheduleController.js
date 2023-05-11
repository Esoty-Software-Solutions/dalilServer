const ScheduleServices = require("../services/scheduleServices");
const DoctorServices = require("../services/doctorServices");
const MedicalCenterServices = require("../services/medicalCenterServices");
const { messageUtil } = require("../utilities/message");
const mongoose = require('mongoose');
const uploader = require("../utilities/uploader");
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} = require("../utilities/response");
const TimeSlotEnum = require("../schemas/timeSlotEnumSchema");
const { getOne, createOne, updateOne, deleteOne, getMany } = require("../services/commonServices");

const dateRegex = /^([0-9]{4})-(?:[0-9]{2})-([0-9]{2})$/;
const DoctorSchema = require("../schemas/doctorSchema");
const MedicalCenterSchema = require("../schemas/medicalCenterSchema");
const ScheduleSchema = require("../schemas/scheduleSchema");

const { renameKey } = require("../utilities/replaceKey");

const CreateSchedule = async (req, res) => {
  try {
    //checking that one of the days must have true value
    if (
      !req.body.monday &&
      !req.body.tuesday &&
      !req.body.wednesday &&
      !req.body.thursday &&
      !req.body.friday &&
      !req.body.saturday &&
      !req.body.sunday
    ) {
      return badRequestErrorResponse(res, messageUtil.selectDay);
    }
    //checking data formate
    if (
      !dateRegex.test(req.body.startDate) &&
      !dateRegex.test(req.body.endDate)
    ) {
      return badRequestErrorResponse(res, messageUtil.invalidDate);
    }
    const start = new Date(req.body.startDate);
    const end = new Date(req.body.endDate);

    // Check if the start date is less than or equal to the end date
    if (start > end) {
      return badRequestErrorResponse(res, messageUtil.invalidStartDate);
    }
    //checking if doctor id is valid
    // let doctor = DoctorServices.getDoctorDetails({ _id: req.body.doctorId });
    let doctor = await getOne({
      schemaName : DoctorSchema,
      body : {_id: req.body.doctorId}
    })
    if (!doctor) {
      return notFoundResponse(res, messageUtil.invalidDoctorId);
    }
    //checking if medical center id is valid
    // let medicalCenter = MedicalCenterServices.getMedicalCenterDetails({
    //   _id: req.body.medicalCenterId,
    // });
    let medicalCenter = await uploader.returnedSingleDoc(MedicalCenterSchema , {_id: req.body.medicalCenterId});

    if (!medicalCenter) {
      return notFoundResponse(res, messageUtil.invalidMedicalCenterId);
    }
    if (!req.body.timeSlot) {
      let timeSlotDetail = await TimeSlotEnum.findOne();
      console.log(timeSlotDetail);
      req.body.timeSlot = timeSlotDetail?._id.toString();
    }
    console.log("right")
    const renamedDoc = renameKey(
      {...req.body},
      ["medicalCenter", "doctor", "timeSlot"],
      ["medicalCenterId", "doctorId", "timeSlotId"],
    );
    // const document = await ScheduleServices.createSchedule({
    //   ...req.body,
    // });
    const document = await createOne({
      schemaName : ScheduleSchema,
      body : {...req.body}
    });
    return successResponse(res, messageUtil.resourceCreated, document);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const UpdateSchedule = async (req, res) => {
  try {
    //checking if doctor id is valid
    if (req.body.doctorId) {
      // let doctor = DoctorServices.getDoctorDetails({ _id: req.body.doctorId });
      let doctor = await getOne({ 
        schemaName : DoctorSchema,
        body : {_id: req.body.doctorId},
        select : {"-__v -createdAt -updatedAt"}
       });
      if (!doctor) {
        return notFoundResponse(res, "Please provide valid doctor id");
      }
    }
    //checking if medical center id is valid
    if (req.body.medicalCenterId) {
      // let medicalCenter = MedicalCenterServices.getMedicalCenterDetails({
      //   _id: req.body.medicalCenterId,
      // });
      const medicalCenter = await uploader.returnedSingleDoc(MedicalCenterSchema , {_id: req.body.medicalCenterId});

      if (!medicalCenter) {
        return notFoundResponse(res, "Please provide valid medical center id");
      }
    }

    const renamedDoc = renameKey(
      {...req.body},
      ["medicalCenter", "doctor", "timeSlot"],
      ["medicalCenterId", "doctorId", "timeSlotId"],
    );
    
    // const document = await ScheduleServices.updateSchedule(
    //   { _id: req.params.scheduleId },
    //   {
    //     ...req.body,
    //   }
    // );
      const document = await updateOne({
        schemaName : ScheduleSchema,
        query : { _id: req.params.scheduleId },
        body : renamedDoc
      })
    return successResponse(res, messageUtil.resourceUpdated, document);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const SpecificSchedule = async (req, res) => {
  try {
    // const document = await ScheduleServices.getScheduleDetails({
    //   _id: req.params.scheduleId,
    // });
    const document = await getOne({
      schemaName : ScheduleSchema,
      body : {_id: req.params.scheduleId},
      select : "-__v -createdAt -updatedAt"
    })
    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }
    return successResponse(res, messageUtil.success, document);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const DeleteSchedule = async (req, res) => {
  try {
    // const document = await ScheduleServices.deleteSchedule({
    //   _id: req.params.scheduleId,
    // });
    const document = await deleteOne({
      schemaName : ScheduleSchema,
      body : {_id: req.params.scheduleId}
    })
    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }
    return successResponse(res, messageUtil.resourceDeleted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const AllSchedule = async (req, res) => {
  try {
    let limitQP = req.query.limit;
    let skipOP = req.query.skip;
    let groupBy = req.query.groupBy;

    if (limitQP) {

      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    } else {
      limitQP = 30;
    }
    if (skipOP) {
      skipOP = Number(skipOP);
      if (skipOP > 100 || skipOP < 1) {
        skipOP = 0;
      }
    } else {
      skipOP = 0;
    }
    let document = {};
    if (groupBy == "doctor" || groupBy == "medicalCenter") {
      document = await ScheduleServices.getAllSchedulesGroupBy(req, limitQP, skipOP);

    }
    else {
      let searchQuery = req.query.searchQuery;
      let medicalCenterId = req.query.medicalCenterId;
  
      let doctorId = req.query.doctorId;
      let city = req.query.city ? req.query.city : req.query.cityId ? req.query.cityId : '';
      let timeSlot = req.query.timeSlot;
      let specialty = req.query.specialty ? req.query.specialty : req.query.medicalSpecialtyId ? req.query.medicalSpecialtyId : '';
     
      let query = {};
      query["$and"] = [];
      if (medicalCenterId) {
        query["$and"].push({ "medicalCenter": { $eq: mongoose.Types.ObjectId(medicalCenterId) } });
      }
      if (specialty) {
        query["$and"].push({ "doctorObject.specialty": { $eq: mongoose.Types.ObjectId(specialty) } });
      }
      if (doctorId) {
        query["$and"].push({ "doctor": { $eq: mongoose.Types.ObjectId(doctorId) } });
      }
      // City Filter
      if (city) {
        query["$and"].push({ "medicalCenter.city": { $eq: mongoose.Types.ObjectId(city) } });
      }
  
      // Time Slot
      if (timeSlot) {
        query["$and"].push({ timeSlot: { $eq: mongoose.Types.ObjectId(timeSlot) } });
      }
      if (searchQuery) {
        query["$and"].push({
          $or: [
            {
              'medicalCenter.name': {
                $regex: searchQuery,
                $options: "i", // Case-insensitive search
              }
            },
            {
              'doctor.firstName': {
                $regex: searchQuery,
                $options: "i", // Case-insensitive search
              }
            }
  
          ]
        })
      }
      console.log(query)
      // document = await ScheduleServices.getAllSchedules(query, limitQP, skipOP);
      document = await getMany({
        schemaName : ScheduleSchema,
        query : query,
        limit : limitQP, 
        skip : skipOP,
        select : "-__v"
      });

    }

    console.log("schedule respo>>>>>>>>>>", document.documents);

    return successResponse(res, messageUtil.success, { objectCount: document.count, objectArray: document.documents });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  CreateSchedule,
  UpdateSchedule,
  SpecificSchedule,
  DeleteSchedule,
  AllSchedule,
};
