import AppointmentServices from "../services/appointmentServices.js";
const createAppointment = async (req, res) => {
  try {
    const document = await AppointmentServices.createAppointment({
      ...req.body,
      userId: req.userId,
      appointmentStatus: `pending`,
      dateCreated: Date(),
    });

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
        appointmentId: req.params.appointmentId,
        userId: req.userId,
      },
      {
        ...req.body,
      }
    );
    if (!document) {
      return res.status(404).json({ message: `document not found` });
    }

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

export {
  createAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
  getAppointments,
};
