const { createOne, updateOne , getOne , getMany , deleteOne, count } = require("../services/commonServices");
const DoctorServices = require("../services/doctorServices");
const ScheduleServices = require("../services/scheduleServices");
const { messageUtil } = require("../utilities/message");
const { renameKey } = require("../utilities/replaceKey");
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} = require("../utilities/response");
const { getSearchQuery } = require("../utilities/searchQuery");
const dateRegex = /^([0-9]{4})-(?:[0-9]{2})-([0-9]{2})$/;
const DoctorSchema = require("../schemas/doctorSchema");

const CreateDoctor = async (req, res) => {
  try {
    if (!dateRegex.test(req.body.birthdate)) {
      return badRequestErrorResponse(res, "Invalid date format");
    }
    // const document = await DoctorServices.createDoctor({
    //   ...req.body,
    // });
    const renamedData = renameKey({...req.body} , "specialty" , "specialtyId");
    const document = await createOne({
      schemaName : DoctorSchema,
      body : renamedData
    })
    return successResponse(res, messageUtil.resourceCreated, document);
  } catch (error) {
    //   checking for server errors
    return serverErrorResponse(res, error);
  }
};

const GetDoctor = async (req, res) => {
  try {

    const document = await getOne({
      schemaName : DoctorSchema, 
      body : {
        _id: req.params.doctorId,
      },
      select : "-__v -createdAt -updatedAt"
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

const UpdateDoctor = async (req, res) => {
  try {
    if (req.body.birthdate) {
      if (!dateRegex.test(req.body.birthdate)) {
        return badRequestErrorResponse(res, "Invalid date format");
      }
    }
    const renamedData = renameKey(data , "specialty" , "specialtyId");
    const document = await updateOne({
      schemaName : DoctorSchema,
      body : renamedData,
      query : { _id: req.params.doctorId },
      select : "-__v -createdAt -updatedAt"
    })
    // const document = await DoctorServices.updateDoctor(
    //   { _id: req.params.doctorId },
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

const DeleteDoctor = async (req, res) => {
  try {
    // const document = await DoctorServices.deleteDoctor({
    //   _id: req.params.doctorId,
    // });
    const document = await deleteOne({
      schemaName : DoctorSchema, 
      body : {_id: req.params.doctorId}
    })
    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }
    return successResponse(res, messageUtil.resourceDeleted);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const AllDoctors = async (req, res) => {
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
    let query = {};
    if (req.query.doctorId) {
      query._id = req.query.doctorId;
    }
    if (req.query.specialty) {
      query.specialty = req.query.specialty;
    } 
    if (req.query.medicalSpecialtyId) {
      query.specialty = req.query.medicalSpecialtyId;
    }
    

    if(req.query.searchQuery) query = getSearchQuery(["firstName" , "secondName" ,"lastName","_id" ], req.query.searchQuery , query);
    // const documents = await DoctorServices.getDoctors(query, limitQP, skipOP);
    const documents = await getMany({
      schemaName : DoctorSchema,
      query : query, 
      limit : limitQP, 
      skip : skipOP
    });
    const counts = await count({
      schemaName : DoctorSchema,
      query : query
    })
    return successResponse(res, messageUtil.success, {
      objectCount: counts,
      objectArray: documents,
    });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
module.exports = {
  CreateDoctor,
  GetDoctor,
  UpdateDoctor,
  DeleteDoctor,
  AllDoctors,
};
