const AppointmentServices = require("../services/appointmentServices");
const SubscriberServices = require("../services/subscriberServices");
const checkFeilds = require("../utilities/checkFields");
const SmsServices = require("../services/smsServices");
const dateRegex = /^([0-9]{4})-(?:[0-9]{2})-([0-9]{2})$/;
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} = require("../utilities/response");
const { messageUtil } = require("../utilities/message");

const createMessage = async (
  doctor,
  medicalCenterName,
  appointmentDate,
  appointmentStatus,
  phone
) => {
  let message_body = `Your appointment for ${doctor} at ${medicalCenterName} on ${appointmentDate} is ${appointmentStatus}`;
  const sms = await SmsServices.createSms({
    phone: phone,
    message: message_body,
  });
  return sms;
};

const createAppointment = async (req, res) => {
  try {
    const {
      beneficiaryId,
      scheduleId,
      appointmentDate,
      appointmentStatus,
      timeSlot,
    } = req.body;
    if (!dateRegex.test(appointmentDate)) {
      return badRequestErrorResponse(res, "Invalid date format");
    }
    const isError = checkFeilds(
      {
        beneficiaryId,
        scheduleId,
        appointmentDate,
        appointmentStatus,
        timeSlot,
      },
      res
    );

    if (isError) return;
    const document = await AppointmentServices.createAppointment({
      ...req.body,
    });

    return successResponse(res, messageUtil.success, document);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const updateAppointment = async (req, res) => {
  try {
    const document = await AppointmentServices.updateAppointment(
      {
        _id: req.params.appointmentId,
        // userId: req.userId,
      },
      {
        appointmentStatus: req.body.appointmentStatus,
      }
    );

    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }

    return successResponse(res, messageUtil.success, document);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const getAppointment = async (req, res) => {
  try {
    const document = await AppointmentServices.getAppointmentDetails({
      _id: req.params.appointmentId,
    });

    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }

    return successResponse(res, messageUtil.success, document);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const getAppointments = async (req, res) => {
  try {
    let limitQP = Number(req.query.limit) ?? 30;
    let query = {};

    if (limitQP) {
      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    } else {
      limitQP = 30;
    }

    if (req.query.medicalCenterId) {
      query.medicalCenterId = req.query.medicalCenterId;
    }
    if (req.query.doctorId) {
      query.doctorId = req.query.doctorId;
    }

    if (req.query.appointmentStatus) {
      let arr = JSON.parse(req.query.appointmentStatus);
      query.appointmentStatus = {
        $in: arr,
      };
    }
    if (req.query.dateRange) {
      let arr = JSON.parse(req.query.dateRange);
      const startDate = new Date(arr[0]);
      const endDate = new Date(arr[1]);
      query.appointmentDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }
    console.log("query: ", query);
    let documents = await AppointmentServices.getAppointments(query, limitQP);
    let count = documents.length;

    if (documents.length < 1) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }
    const data = {
      objectCount: count,
      objectArray: documents,
    };

    return successResponse(res, messageUtil.success, data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserAppointments = async (req, res) => {
  try {
    let subscriber = await SubscriberServices.getSubscriber({
      _id: req.params.subscriberId,
    });

    if (!subscriber) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }
    if (subscriber.beneficiaries.length < 1) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }
    let query = { beneficiaryId: { $in: subscriber.beneficiaries } };

    if (req.query.appointmentStatus) {
      let arr = JSON.parse(req.query.appointmentStatus);
      query.appointmentStatus = {
        $in: arr,
      };
    }
    if (req.query.dateRange) {
      let arr = JSON.parse(req.query.dateRange);
      const startDate = new Date(arr[0]);
      const endDate = new Date(arr[1]);
      query.appointmentDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }
    let documents = await AppointmentServices.getAppointments(query);
    let count = documents.length;

    if (documents.length < 1) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }
    const data = {
      objectCount: count,
      objectArray: documents,
    };

    return successResponse(res, messageUtil.success, data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {};

module.exports = {
  createAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
  getAppointments,
  getUserAppointments,
};
