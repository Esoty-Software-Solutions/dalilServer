import MedicalFilesServices from "../services/medicalFilesServices.js";
import SubscriberServices from "../services/subscriberServices.js";
import {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} from "../utilities/response.js";
import messageUtil from "../utilities/message.js";

const createMedicalFile = async (req, res) => {
  try {
    const document = await MedicalFilesServices.createMedicalFile(req.body);

    const updateBeneficiary = await SubscriberServices.updateBeneficiaries(
      { _id: req.params.beneficiaryId },
      { medicalFiles: document._id }
    );

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
export { createMedicalFile, updateMedicalFile, getMedicalFiles };
