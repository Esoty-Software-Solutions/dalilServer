const MedicalCenterServices = require("../services/medicalCenterServices");

const CreateMedicalCenter = async (req, res) => {
  try {
    const fieldNamesList = [];
    const originalNamesList = [];

    // console.log("files in req");
    // console.log("files" in req);
    // check if files are submitted
    if ("files" in req) {
      req.files.forEach((file) => {
        fieldNamesList.push(file.fieldname);
        originalNamesList.push(file.originalname);
      });
    }

    const document = await MedicalCenterServices.createMedicalCenter({
      ...req.body,
      createdBy: req.userId,

      isActive: true,
      fieldNames: fieldNamesList,
      originalNames: originalNamesList,
    });
    const responseBody = {
      codeStatus: "201",
      message: "document created",
      data: document,
    };
    return res.status(201).json({ ...responseBody });
  } catch (error) {
    //   checking for server errors
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const SingleMedicalCenter = async (req, res) => {
  try {
    const document = await MedicalCenterServices.getMedicalCenterDetails(
      req.params.id
    );
    if (document.length === 0) {
      return res.status(404).json({ message: `document not found` });
    }

    res.status(200).json(document);
  } catch (error) {
    //   checking for server errors
    console.log(error);
    res.status(200).json({ message: error.message });
  }
};

const UpdateMedicalCenter = async (req, res) => {
  try {
    const document = await MedicalCenterServices.updateMedicalCenter(
      { _id: req.params.medicalCenterId },
      { ...req.body, updatedBy: req.userId }
    );

    if (!document) {
      return res.status(404).json({ message: `document not found` });
    }

    res.status(200).json(document);
  } catch (error) {
    //   checking for server errors
    console.log(error);
    res.status(200).json({ message: error.message });
  }
};

const DeleteMedicalCenter = async (req, res) => {
  try {
    const document = await MedicalCenterServices.deleteMedicalCenter(
      req.params.medicalCenterId
    );
    if (!document) {
      return res.status(404).json({ message: `document not found` });
    }
    res.status(200).json({ message: `successfully Deleted` });
  } catch (error) {
    //   checking for server errors
    console.log(error);
    res.status(200).json({ message: error.message });
  }
};

const AllMedicalCenter = async (req, res) => {
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
    const documents = await MedicalCenterServices.getAllMedicalCenters(
      {},
      limitQP
    );
    const responseBody = {
      codeStatus: "200",
      message: "good",
      data: {
        objectCount: documents.length,
        objectArray: documents,
      },
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    //   checking for server errors
    console.log(error);
    res.status(200).json({ message: error.message });
  }
};
module.exports = {
  CreateMedicalCenter,
  SingleMedicalCenter,
  UpdateMedicalCenter,
  DeleteMedicalCenter,
  AllMedicalCenter,
};
