const MedicalFilesServices = require("../services/medicalFilesServices");
const SubscriberServices = require("../services/subscriberServices");
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} = require("../utilities/response");
const { messageUtil } = require("../utilities/message");

const createMedicalFile = async (req, res) => {
  try {
    // common services not needed as one main function is being used
    const document = await MedicalFilesServices.createMedicalFiles(req.body);

    const updateBeneficiary = await updateOne({
      schemaName : beneficiaries,
      body : {medicalFiles: document._id},
      query : {_id: req.params.beneficiaryId} 
    });

    // const updateBeneficiary = await SubscriberServices.updateBeneficiaries({
    //   { _id: req.params.beneficiaryId },
    //   { medicalFiles: document._id }
    // });

    return successResponse(res, messageUtil.resourceUpdated, document);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const updateMedicalFile = async (req, res) => {
  try {
    // Update document and register the user
    const { type } = req.body;

    if (req.files.length > 0) {
      req.body = {
        ...req.body,
        file: req.files[0].location,
      };
    }
    const document = await MedicalFilesServices.updateMedicalFile(
      { _id: req.params.id },
      { $push: { [`${type}`]: req.body } }
    );
    if (!document) {
      return badRequestErrorResponse(res, messageUtil.resourceNotFound);
    }
    return successResponse(res, messageUtil.resourceUpdated, document);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const getMedicalFiles = async (req, res) => {
  try {
    const document = await MedicalFilesServices.getMedicalFiles();
    if (document.length < 1) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }
    return successResponse(res, messageUtil.success, document);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};


const DeleteMedicalFile = async (req, res) => {
  try {
    const document = await MedicalFilesServices.deleteMedicalFile(req.params.schema, {
      _id: req.params.fileId,
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

module.exports = {
  createMedicalFile,
  updateMedicalFile,
  getMedicalFiles,
  DeleteMedicalFile
};
