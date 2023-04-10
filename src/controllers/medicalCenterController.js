const MedicalCenterServices = require("../services/medicalCenterServices");
const { messageUtil } = require("../utilities/message");
const ScheduleServices = require("../services/scheduleServices");
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} = require("../utilities/response");

const CreateMedicalCenter = async (req, res) => {
  try {
    const fieldNamesList = [];

    // check if files are submitted
    if ("files" in req) {
      req.files.forEach((file) => {
        fieldNamesList.push(file.location);
      });
    }

    const document = await MedicalCenterServices.createMedicalCenter({
      ...req.body,
      isActive: true,
      fileLink: fieldNamesList,
    });

    return successResponse(res, messageUtil.resourceCreated, document);
  } catch (error) {
    //   checking for server errors
    return serverErrorResponse(res, error);
  }
};

const SingleMedicalCenter = async (req, res) => {
  try {
    const document = await MedicalCenterServices.getMedicalCenterDetails({
      _id: req.params.medicalCenterId,
    });
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
    const document = await MedicalCenterServices.updateMedicalCenter(
      { _id: req.params.medicalCenterId },
      { ...req.body }
    );

    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }

    return successResponse(res, messageUtil.resourceUpdated, document);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const DeleteMedicalCenter = async (req, res) => {
  try {
    const document = await MedicalCenterServices.deleteMedicalCenter({
      _id: req.params.medicalCenterId,
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
        limitQP = 0;
      }
    } else {
      skipOP = 0;
    }
    if (req.query.doctorId) {
      let medicalCenters = [];
      //finding schedules for doctor
      let schedules = await ScheduleServices.getAllSchedules({
        doctorId: req.query.doctorId,
      });
      //returning if schedules not found
      if (schedules.length < 1) {
        return notFoundResponse(res, messageUtil.resourceNotFound);
      }

      //iterating all schdules to find medical center through medicalCenterId
      for (let i = 0; i < schedules.length; i++) {
        //finding medical centers
        let medicalCenter = await MedicalCenterServices.getMedicalCenterDetails(
          { _id: schedules[i].medicalCenterId }
        );
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
      if (req.query.medicalCenterId) {
        query._id = req.query.medicalCenterId;
      }
      if (req.query.city) {
        query.city = req.query.city;
      }

      const documents = await MedicalCenterServices.getAllMedicalCenters(
        query,
        limitQP,
        skipOP
      );
      if (documents.length < 1) {
        return notFoundResponse(res, messageUtil.resourceNotFound);
      }
      return successResponse(res, messageUtil.success, {
        objectCount: documents.length,
        objectArray: documents,
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
