const ScheduleServices = require("../services/scheduleServices");
const DoctorServices = require("../services/doctorServices");
const MedicalCenterServices = require("../services/medicalCenterServices");
const { messageUtil } = require("../utilities/message");
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} = require("../utilities/response");

const dateRegex = /^([0-9]{4})-(?:[0-9]{2})-([0-9]{2})$/;

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
    let doctor = DoctorServices.getDoctorDetails({ _id: req.body.doctorId });
    if (!doctor) {
      return notFoundResponse(res, messageUtil.invalidDoctorId);
    }
    //checking if medical center id is valid
    let medicalCenter = MedicalCenterServices.getMedicalCenterDetails({
      _id: req.body.medicalCenterId,
    });
    if (!medicalCenter) {
      return notFoundResponse(res, messageUtil.invalidMedicalCenterId);
    }

    const document = await ScheduleServices.createSchedule({
      ...req.body,
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
      let doctor = DoctorServices.getDoctorDetails({ _id: req.body.doctorId });
      if (!doctor) {
        return notFoundResponse(res, "Please provide valid doctor id");
      }
    }
    //checking if medical center id is valid
    if (req.body.medicalCenterId) {
      let medicalCenter = MedicalCenterServices.getMedicalCenterDetails({
        _id: req.body.medicalCenterId,
      });
      if (!medicalCenter) {
        return notFoundResponse(res, "Please provide valid medical center id");
      }
    }

    const document = await ScheduleServices.updateSchedule(
      { _id: req.params.scheduleId },
      {
        ...req.body,
      }
    );

    return successResponse(res, messageUtil.resourceUpdated, document);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const SpecificSchedule = async (req, res) => {
  try {
    const document = await ScheduleServices.getScheduleDetails({
      _id: req.params.scheduleId,
    });
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
    const document = await ScheduleServices.deleteSchedule({
      _id: req.params.scheduleId,
    });
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
    if (limitQP) {
      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    } else {
      limitQP = 30;
    }
    let documents = await ScheduleServices.getAllSchedules({}, limitQP);
    let message = "success";
    if (documents.length === 0) {
      message = "list is empty change your query";
    }
    const responseBody = {
      codeStatus: "200",
      message: message,
      data: {
        objectCount: documents.length,
        objectArray: documents,
      },
    };

    res.status(200).json({ ...responseBody });
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
