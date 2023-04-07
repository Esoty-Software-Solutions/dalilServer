const DoctorServices = require("../services/doctorServices");
const { messageUtil } = require("../utilities/message");
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} = require("../utilities/response");
const dateRegex = /^([0-9]{4})-(?:[0-9]{2})-([0-9]{2})$/;

const CreateDoctor = async (req, res) => {
  try {
    if (!dateRegex.test(req.body.birthdate)) {
      return badRequestErrorResponse(res, "Invalid date format");
    }

    const document = await DoctorServices.createDoctor({
      ...req.body,
    });

    return successResponse(res, messageUtil.resourceCreated, document);
  } catch (error) {
    //   checking for server errors
    return serverErrorResponse(res, error);
  }
};

const GetDoctor = async (req, res) => {
  try {
    const document = await DoctorServices.getDoctorDetails({
      _id: req.params.doctorId,
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

const UpdateDoctor = async (req, res) => {
  try {
    if (req.body.birthdate) {
      if (!dateRegex.test(req.body.birthdate)) {
        return badRequestErrorResponse(res, "Invalid date format");
      }
    }

    const document = await DoctorServices.updateDoctor(
      { _id: req.params.doctorId },
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

const DeleteDoctor = async (req, res) => {
  try {
    const document = await DoctorServices.deleteDoctor({
      _id: req.params.doctorId,
    });
    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }
    return successResponse(res, messageUtil.resourceDeleted);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const AllDoctors = async (req, res) => {
  //   try {
  //     let limitQP = req.query.limit;
  //     if (limitQP) {
  //       limitQP = Number(limitQP);
  //       if (limitQP > 100 || limitQP < 1) {
  //         limitQP = 30;
  //       }
  //     } else {
  //       limitQP = 30;
  //     }
  //     if (req.query.doctorId) {
  //       let medicalCenters = [];
  //       //finding schedules for doctor
  //       let schedules = await ScheduleServices.getAllSchedules({
  //         doctorId: req.query.doctorId,
  //       });
  //       if (schedules.length < 1) {
  //         return notFoundResponse(res, messageUtil.resourceNotFound);
  //       }
  //       for (let i = 0; i < schedules.length; i++) {
  //         //finding medical centers
  //         let medicalCenter = await MedicalCenterServices.getMedicalCenterDetails(
  //           { _id: schedules[i].medicalCenterId }
  //         );
  //         //pushing medical centers
  //         medicalCenters.push(medicalCenter);
  //       }
  //       if (medicalCenters.length < 1) {
  //         return notFoundResponse(res, messageUtil.resourceNotFound);
  //       }
  //       return successResponse(res, messageUtil.success, {
  //         objectCount: medicalCenters.length,
  //         objectArray: medicalCenters,
  //       });
  //     } else {
  //       let query = {};
  //       if (req.query.medicalCenterId) {
  //         query._id = req.query.medicalCenterId;
  //       }
  //       if (req.query.speciality) {
  //         query.speciality = req.query.speciality;
  //       }
  //       const documents = await MedicalCenterServices.getAllMedicalCenters(
  //         query,
  //         limitQP
  //       );
  //       return successResponse(res, messageUtil.success, {
  //         objectCount: documents.length,
  //         objectArray: documents,
  //       });
  //     }
  //   } catch (error) {
  //     return serverErrorResponse(res, error);
  //   }
};
module.exports = {
  CreateDoctor,
  GetDoctor,
  UpdateDoctor,
  DeleteDoctor,
  AllDoctors,
};
