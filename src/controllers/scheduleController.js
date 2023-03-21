import ScheduleServices from "../services/scheduleServices.js";

const CreateSchedule = async (req, res) => {
  try {
    const document = await ScheduleServices.createSchedule({
      ...req.body,

      createdBy: req.userId,

      isActive: true,
    });

    const responseBody = {
      codeStatus: "201",
      message: "document created",
      data: document,
    };
    return res.status(201).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const UpdateSchedule = async (req, res) => {
  try {
    const document = await ScheduleServices.updateSchedule(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.userId,
      },
      { new: true }
    );
    if (!document) {
      return res.status(404).json({ message: `schedule not found` });
    }
    res.status(200).json(document);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const SpecificSchedule = async (req, res) => {
  try {
    const document = await ScheduleServices.getScheduleDetails(req.params.id);
    if (!document) {
      return res.status(404).json({ message: `schedule not found` });
    }
    res.status(200).json(document);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const DeleteSchedule = async (req, res) => {
  try {
    const document = await ScheduleServices.deleteSchedule(
      req.params.id
    ).lean();
    if (!document) {
      return res.status(404).json({ message: `schedule not found` });
    }
    res.status(200).json({ message: `successfully deleted` });
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
    let documents = ScheduleServices.getAllSchedules({}, limitQP);
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
export {
  CreateSchedule,
  UpdateSchedule,
  SpecificSchedule,
  DeleteSchedule,
  AllSchedule,
};
