const PharmacyServices = require("../services/pharmacyServices");
const { messageUtil } = require("../utilities/message");
const ScheduleServices = require("../services/scheduleServices");
const PharmacySchema = require("../schemas/pharmacySchema");
const ScheduleSchema = require("../schemas/scheduleSchema");
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} = require("../utilities/response");
const { convertStringToArray, renameKey } = require("../utilities/replaceKey");
const { createOne, updateOne , deleteOne, getMany, count } = require("../services/commonServices");
const uploader = require("../utilities/uploader");
const config = require("../config/config");
const CreatePharmacy = async (req, res) => {
  try {
    const fieldNamesList = [];
    if ("files" in req) {
      req.files.forEach((file) => {
        fieldNamesList.push(file.location);
      });
    }
    const finalDoc = convertStringToArray(req.body, "phoneNumber");
    const renamedData = renameKey(finalDoc , "city" , "cityId");
    // const document = await PharmacyServices.createPharmacy({
    //   ...finalDoc,
    //   isActive: true,
    //   fileLink: fieldNamesList,
    // });
    const document = await createOne({
      schemaName : PharmacySchema,
      body : {
        ...renamedData,
        isActive: true,
        fileLink: fieldNamesList}
    })
    const doc = await uploader.returnedSingleDoc(PharmacySchema , document._id);
    
    return successResponse(res, messageUtil.resourceCreated, doc);
  } catch (error) {
    //   checking for server errors
    return serverErrorResponse(res, error);
  }
};

const SinglePharmacy = async (req, res) => {
  try {
    
    // const document = await PharmacyServices.getPharmacyDetails({
    //   _id: req.params.pharmacyId,
    // });
    const document = await uploader.returnedSingleDoc(PharmacySchema , {_id: req.params.pharmacyId});

    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }

    return successResponse(res, messageUtil.success, document);
  } catch (error) {
    //   checking for server errors
    return serverErrorResponse(res, error);
  }
};

const UpdatePharmacy = async (req, res) => {
  try {
    const renamedData = renameKey({...req.body} , "city" , "cityId");
    
    const document = await updateOne({
      schemaName : PharmacySchema,
      query : { _id: req.params.pharmacyId },
      body : renamedData 
    })
    // const document = await PharmacyServices.updatePharmacy(
    //   { _id: req.params.pharmacyId },
    //   { ...req.body }
    // );

    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }

    return successResponse(res, messageUtil.resourceUpdated, document);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const DeletePharmacy = async (req, res) => {
  try {
    // const document = await PharmacyServices.deletePharmacy({
    //   _id: req.params.pharmacyId,
    // });
    const document = await deleteOne({
      schemaName : PharmacySchema,
      body : {_id: req.params.pharmacyId}
    })
    if (!document) {
      return notFoundResponse(res, messageUtil.resourceDeleted);
    }
    return successResponse(res, messageUtil.resourceUpdated);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const AllPharmacy = async (req, res) => {
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
        limitQP = 0;
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
      //returning if schedules not found
      if (schedules.length < 1) {
        return notFoundResponse(res, messageUtil.resourceNotFound);
      }

      //iterating all schdules to find medical center through pharmacyId
      for (let i = 0; i < schedules.length; i++) {
        //finding medical centers
        // let medicalCenter = await PharmacyServices.getPharmacyDetails(
        //   { _id: schedules[i].pharmacyId }
        // );
        const medicalCenter = await uploader.returnedSingleDoc(PharmacySchema , {_id: schedules[i].pharmacyId });

        //pushing medical centers
        medicalCenters.push(medicalCenter);
      }

      //returning if no medical center found
      if (medicalCenters.length < 1) {
        return notFoundResponse(res, messageUtil.resourceNotFound);
      }

      return successResponse(res, messageUtil.success, {
        objectCount: medicalCenters.length,
        objectArray: medicalCenters,
      });
    } else {
      let query = {};
      if (req.query.pharmacyId) {
        query._id = req.query.pharmacyId;
      }
      if (req.query.city) {
        query.city = req.query.city;
      }

      // const documents = await PharmacyServices.getAllPharmacys(
      //   query,
      //   limitQP,
      //   skipOP
      // );
      const documents = await getMany({
        schemaName : PharmacySchema,
        query : query,
        limit :limitQP,
        skip : skipOP
      });
      const newDocuments = await Promise.all(documents.map(async data => {
        if(data?.fileLink.length) {
          const presignedUrlArray = await Promise.all(data.fileLink.map(async link => await uploader.getPresignedUrl(link , config.dalilStorage_bucket)));
          data.fileLink = presignedUrlArray;
        }
        return data;
      }))
      const counts = await count({
        schemaName : PharmacySchema,
        query : query
      });
      return successResponse(res, messageUtil.success, {
        objectCount: counts,
        objectArray: newDocuments,
      });
    }
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
module.exports = {
  CreatePharmacy,
  SinglePharmacy,
  UpdatePharmacy,
  DeletePharmacy,
  AllPharmacy,
};
