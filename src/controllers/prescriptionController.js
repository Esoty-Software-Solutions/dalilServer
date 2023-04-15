const PrescriptionServices = require("../services/prescriptionServices");
const { messageUtil } = require("../utilities/message");
const { successResponse, serverErrorResponse } = require("../utilities/response");
require("dotenv").config();

const AddPrescription = async (req, res) => {
  try {
    const query = {
      ...req.body,
    };
    const fieldNamesList = [];
    // check if files are submitted
    if ("files" in req) {
      req.files.forEach((file) => {
        fieldNamesList.push(file.location);
      });
    }
    if (req.files.length > 0) {
      query.fileLink = fieldNamesList;
    }
    const prescription = await PrescriptionServices.createPrescription(query);
    return successResponse(res, messageUtil.resourceCreated, prescription);
  } catch (err) {
    return serverErrorResponse(res, err.message);
  }
};

const AllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await PrescriptionServices.getAllPrescriptions();

    if (prescriptions.length === 0) {
      return res.status(404).json({ message: "No prescription found" });
    }

    return successResponse(res, messageUtil.success, {
      prescriptions,
      objectCount: prescriptions.length,
    });
  } catch (err) {
    return serverErrorResponse(res, err.message);
  }
};

const PrescriptionById = async (req, res) => {
  // destructure queryObject

  const { prescriptionId } = req.params;

  if (!prescriptionId) {
    return res.status(404).json({ message: "Please insert prescription id" });
  }

  // this function will be moved in utilities
  // const getSignedUrl = (image, expiry_time) => {
  //   let bucket_params = {
  //     Bucket: process.env.aws_bucketName,
  //     Key: image.split(S3_BUCKET_URL)[1],
  //     Expires: expiry_time ? Number(expiry_time) : 60,
  //   };
  //   //returning the signed url
  //   return s3.getSignedUrl("getObject", bucket_params);
  // };

  try {
    const findPrescription = await PrescriptionServices.getPrescriptionDetails({
      _id: prescriptionId,
    });
    if (!findPrescription) {
      return res.status(404).json({ message: "No prescription found" });
    }
    // let signed_url;
    // if (findPrescription.prescription_image) {
    //   signed_url = getSignedUrl(findPrescription.prescription_image, expiry_time);
    // }

    return successResponse(res, messageUtil.success, findPrescription);
  } catch (err) {
    return serverErrorResponse(res, err.message);
  }
};

const DeletePrescription = async (req, res) => {
  try {
    const prescription = await PrescriptionServices.deletePrescription({
      _id: req.params.id,
    });
    if (!prescription) {
      return res.status(404).json({ message: "No prescription found" });
    }
    return successResponse(res, messageUtil.resourceDeleted);
  } catch (err) {
    return serverErrorResponse(res, err.message);
  }
};

const UpdatePrescription = async (req, res) => {
  const { prescriptionId } = req.params;

  try {
    const prescription = await PrescriptionServices.updatePrescription(
      { _id: prescriptionId },
      { ...req.body },
    );

    if (!prescription) {
      return res.status(404).json({ message: "No prescription found" });
    }
    return successResponse(res, messageUtil.resourceUpdated, prescription);
  } catch (err) {
    return serverErrorResponse(res, err.message);
  }
};

module.exports = {
  AddPrescription,
  UpdatePrescription,
  DeletePrescription,
  PrescriptionById,
  AllPrescriptions,
};
