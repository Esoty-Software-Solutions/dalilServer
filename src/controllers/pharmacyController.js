const PharmacyServices = require("../services/pharmacyServices");
const { messageUtil } = require("../utilities/message");
const ScheduleServices = require("../services/scheduleServices");
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} = require("../utilities/response");
const { convertStringToArray } = require("../utilities/replaceKey");

const CreatePharmacy = async (req, res) => {
  try {
    const fieldNamesList = [];
    if ("files" in req) {
      req.files.forEach((file) => {
        fieldNamesList.push(file.location);
      });
    }
    const finalDoc = convertStringToArray(req.body, "phoneNumber");
    const document = await PharmacyServices.createPharmacy({
      ...finalDoc,
      isActive: true,
      fileLink: fieldNamesList,
    });

    return successResponse(res, messageUtil.resourceCreated, document);
  } catch (error) {
    //   checking for server errors
    return serverErrorResponse(res, error);
  }
};

const SinglePharmacy = async (req, res) => {
  try {
    
    const document = await PharmacyServices.getPharmacyDetails({
      _id: req.params.pharmacyId,
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

const UpdatePharmacy = async (req, res) => {
  try {
    const document = await PharmacyServices.updatePharmacy(
      { _id: req.params.pharmacyId },
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

const DeletePharmacy = async (req, res) => {
  try {
    const document = await PharmacyServices.deletePharmacy({
      _id: req.params.pharmacyId,
    });
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
      let schedules = await ScheduleServices.getAllSchedules({
        doctorId: req.query.doctorId,
      });
      //returning if schedules not found
      if (schedules.length < 1) {
        return notFoundResponse(res, messageUtil.resourceNotFound);
      }

      //iterating all schdules to find medical center through pharmacyId
      for (let i = 0; i < schedules.length; i++) {
        //finding medical centers
        let medicalCenter = await PharmacyServices.getPharmacyDetails(
          { _id: schedules[i].pharmacyId }
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
      if (req.query.pharmacyId) {
        query._id = req.query.pharmacyId;
      }
      if (req.query.city) {
        query.city = req.query.city;
      }

      const documents = await PharmacyServices.getAllPharmacys(
        query,
        limitQP,
        skipOP
      );
      // if (documents.length < 1) {
      //   return notFoundResponse(res, messageUtil.resourceNotFound);
      // }
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
  CreatePharmacy,
  SinglePharmacy,
  UpdatePharmacy,
  DeletePharmacy,
  AllPharmacy,
};
