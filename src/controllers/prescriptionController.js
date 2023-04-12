const PrescriptionServices = require("../services/prescriptionServices");
require("dotenv").config();

const AddPrescription = async (req, res) => {
  try {
    const findPrescription = await PrescriptionServices.getPrescriptionDetails({
      title: req.body.title,
    });
    if (findPrescription) {
      return res.status(400).json({ error: "Prescription already exist" });
    }
    let query = {
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
    let prescription = await PrescriptionServices.createPrescription(query);
    res.status(200).json({
      prescription,
      message: "Institute created successfully",
    });
    //   successResponse(res, messageUtil.ok, prescription);
  } catch (err) {
    //   serverErrorResponse(res, err);
    res.status(500).json({ message: err.message });
  }
};

const AllPrescriptions = async (req, res) => {
  try {
    let prescriptions = await PrescriptionServices.getAllPrescriptions();

    if (prescriptions.length === 0) {
      return res.status(404).json({ message: "No prescription found" });
    }

    return res.status(200).json({
      prescriptions,
      objectCount: prescriptions.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const PrescriptionById = async (req, res) => {
  //destructure queryObject

  const { prescriptionId } = req.params;

  if (!prescriptionId) {
    return res.status(404).json({ message: "Please insert prescription id" });
  }

  //this function will be moved in utilities
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
    let findPrescription = await PrescriptionServices.getPrescriptionDetails({
      _id: prescriptionId,
    });
    if (!findPrescription) {
      return res.status(404).json({ message: "No prescription found" });
    }
    // let signed_url;
    // if (findPrescription.prescription_image) {
    //   signed_url = getSignedUrl(findPrescription.prescription_image, expiry_time);
    // }
    return res.status(200).json({
      data: { findPrescription },
      message: "Prescription found.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const DeletePrescription = async (req, res) => {
  try {
    let prescription = await PrescriptionServices.deletePrescription({
      _id: req.params.id,
    });
    if (!prescription) {
      return res.status(404).json({ message: "No prescription found" });
    }
    return res.status(200).json({
      prescription,
      message: "Prescription delted.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const UpdatePrescription = async (req, res) => {
  const { prescriptionId } = req.params;

  try {
    let prescription = await PrescriptionServices.updatePrescription(
      { _id: prescriptionId },
      { ...req.body }
    );

    if (!prescription) {
      return res.status(404).json({ message: "No prescription found" });
    }
    return res.status(200).json({
      prescription,
      message: "Prescription updated successfully.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  AddPrescription,
  UpdatePrescription,
  DeletePrescription,
  PrescriptionById,
  AllPrescriptions,
};
