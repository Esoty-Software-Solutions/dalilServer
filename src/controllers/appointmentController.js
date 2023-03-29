const AppointmentServices = require("../services/appointmentServices");
const MedicalCenterServices = require("../services/medicalCenterServices");
const ScheduleServices = require("../services/scheduleServices");
const DoctorServices = require("../services/doctorServices");
const UserServices = require("../services/userServices");
const SmsServices = require("../services/smsServices");

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
    const doctorObject = await DoctorServices.getDoctorDetails({
      _id: req.body.doctorId,
    });
    const medicalCenterObject =
      await MedicalCenterServices.getMedicalCenterDetails({
        _id: req.body.medicalCenterId,
      });

    const scheduleObject = await ScheduleServices.getScheduleDetails({
      _id: req.body.scheduleId,
    });
    const userObject = await UserServices.getUser({
      _id: req.body.userId,
    });
    const document = await AppointmentServices.createAppointment({
      ...req.body,
      doctor: doctorObject,
      medicalCenter: medicalCenterObject,
      schedule: scheduleObject,
      user: userObject,
      // userId: req.params.userId,
      appointmentStatus: `pending`,
      dateCreated: Date(),
    });

    const sms = await createMessage(
      doctorObject?.firstName,
      medicalCenterObject?.name,
      document.appointmentDate,
      document.appointmentStatus,
      userObject?.phoneNumber
    );

    let message = "good";
    const responseBody = {
      codeStatus: "200",
      message: message,
      data: document,
    };

    return res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
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
        ...req.body,
      }
    );

    if (!document) {
      return res.status(404).json({ message: `document not found` });
    }

    const sms = await createMessage(
      document.doctor?.firstName,
      document.medicalCenter?.name,
      document.appointmentDate,
      document.appointmentStatus,
      document.user?.phoneNumber
    );

    return res.status(200).json(document);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    let limitQP = Number(req.query.limit) ?? 30;

    if (limitQP) {
      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    } else {
      limitQP = 30;
    }

    let documents = AppointmentServices.getAppointments({}, limitQP);
    let count = documents.length;

    let message = "good";
    if (documents.length === 0) {
      message = "list is empty change your query";
    }
    const responseBody = {
      codeStatus: "200",
      message: message,
      data: {
        objectCount: count,
        objectArray: documents,
      },
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAppointment = async (req, res) => {};
const deleteAppointment = async (req, res) => {};

module.exports = {
  createAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
  getAppointments,
};
