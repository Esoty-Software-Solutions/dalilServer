const MedicalCenterServices = require("../services/medicalCenterServices");
const { messageUtil } = require("../utilities/message");
const ScheduleServices = require("../services/scheduleServices");
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} = require("../utilities/response");
const { getSearchQuery } = require("../utilities/searchQuery");
const { convertStringToArray, renameKey, removeKey } = require("../utilities/replaceKey");
const MedicalCenterSchema = require("../schemas/medicalCenterSchema");
const { createOne, getOne, updateOne , deleteOne, getMany } = require("../services/commonServices");
const uploader = require("../utilities/uploader");
const ScheduleSchema = require("../schemas/scheduleSchema");

const CreateMedicalCenter = async (req, res) => {
  try {
    const fieldNamesList = [];
    // check if files are submitted
    if ("files" in req) {
      req.files.forEach((file) => {
        fieldNamesList.push(file.location);
      });
    }
    const finalDoc = convertStringToArray(req.body, "phoneNumber");
    const renamedData = renameKey(finalDoc , "city" , "cityId");
    renamedData.phoneNumber = Object.values(renamedData.phoneNumber);
    
    // const document = await MedicalCenterServices.createMedicalCenter({
    //   ...finalDoc,
    //   isActive: true,
    //   fileLink: fieldNamesList,
    // });
    
    const document = await createOne({
      schemaName : MedicalCenterSchema,
      body : renamedData
    });
    const doc = await uploader.returnedSingleDoc(MedicalCenterSchema , document._id);

    return successResponse(res, messageUtil.resourceCreated, doc);
  } catch (error) {
    //   checking for server errors
    return serverErrorResponse(res, error);
  }
};

const SingleMedicalCenter = async (req, res) => {
  try {
    // const document = await MedicalCenterServices.getMedicalCenterDetails({
    //   _id: req.params.medicalCenterId,
    // });
    const document = await getOne({
      schemaName : MedicalCenterSchema,
      body : {_id: req.params.medicalCenterId}
    })
    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }

    return successResponse(res, messageUtil.success, document);
  } catch (error) {
    //   checking for server errors
    return serverErrorResponse(res, error);
  }
};

const UpdateMedicalCenter = async (req, res) => {
  try {
    console.log(req.params)
    const renamedData = renameKey({...req.body} , "city" , "cityId");
    
    // const document = await MedicalCenterServices.updateMedicalCenter(
    //   { _id: req.params.medicalCenterId },
    //   { ...req.body }
    // );
    const document = await updateOne({
      schemaName : MedicalCenterSchema,
      query : {_id: req.params.medicalCenterId}, 
      body : renamedData
    });
    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }
    const finalData = removeKey(document , "fileLink");

    return successResponse(res, messageUtil.resourceUpdated, finalData);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const DeleteMedicalCenter = async (req, res) => {
  try {
    // const document = await MedicalCenterServices.deleteMedicalCenter({
    //   _id: req.params.medicalCenterId,
    // });
    const document = await deleteOne({
      schemaName : MedicalCenterSchema,
      body : {_id: req.params.medicalCenterId}
    });
    if (!document) {
      return notFoundResponse(res, messageUtil.resourceDeleted);
    }
    return successResponse(res, messageUtil.resourceUpdated);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const AllMedicalCenter = async (req, res) => {
  try {
    let limitQP = req.query.limit;
    let skipOP = req.query.skip;
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
    if (req.query.doctorId) {
      let medicalCenters = [];
      //finding schedules for doctor
      // let schedules = await ScheduleServices.getAllSchedules({
      //   doctorId: req.query.doctorId,
      // });
      let schedules = await getMany({
        schemaName : ScheduleSchema,
        query : {doctorId: req.query.doctorId}
      });


      //iterating all schdules to find medical center through medicalCenterId
      for (let i = 0; i < schedules.length; i++) {
        //finding medical centers
        // let medicalCenter = await MedicalCenterServices.getMedicalCenterDetails(
        //   { _id: schedules[i].medicalCenterId }
        // );
        const medicalCenter = await uploader.returnedSingleDoc(MedicalCenterSchema , {_id : schedules[i].medicalCenterId});
        //pushing medical centers
        medicalCenters.push(medicalCenter);
      }


      return successResponse(res, messageUtil.success, {
        objectCount: medicalCenters.length,
        objectArray: medicalCenters,
      });
    } else {
      let query = {};
      if (req.query.medicalCenterId) {
        query._id = req.query.medicalCenterId;
      }
      if (req.query.city) {
        query.city = req.query.city;
      }
      if (req.query.cityId) {
        query.city = req.query.cityId;
      }
      
      if(req.query.searchQuery) query = getSearchQuery(["name"], req.query.searchQuery ,  query);
      // const documents = await MedicalCenterServices.getAllMedicalCenters(
      //   query,
      //   limitQP,
      //   skipOP
      // );
      const documents = await getMany({
        schemaName : MedicalCenterSchema,
        query : query,
        limit : limitQP,
        skip : skipOP
      })
      return successResponse(res, messageUtil.success, {
        objectCount: documents.objectsCount,
        objectArray: documents.newDocuments,
      });
    }
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
module.exports = {
  CreateMedicalCenter,
  SingleMedicalCenter,
  UpdateMedicalCenter,
  DeleteMedicalCenter,
  AllMedicalCenter,
};
