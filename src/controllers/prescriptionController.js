const PrescriptionServices = require("../services/prescriptionServices");
const PrescriptionSchema = require("../schemas/prescriptionSchema");
const { messageUtil } = require("../utilities/message");
const { successResponse, serverErrorResponse } = require("../utilities/response");
require("dotenv").config();

const AddPrescription = async (req, res) => {
  try {
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
    // let prescription = await PrescriptionServices.createPrescription(query);
    let prescription = await createOne({
      schemaName : PrescriptionSchema,
      body : query
    }) 
    if(prescription?.fileLink?.length) {
      const presignedUrlArray = await Promise.all(prescription?.fileLink?.map(link => uploader.getPresignedUrl(link, config.dalilStorage_bucket)));
      createdDoc.fileLink = presignedUrlArray;
    }
    return successResponse(res, messageUtil.resourceCreated, prescription);
    
  } catch (err) {
    return serverErrorResponse(res, err.message);
    
  }
};

const AllPrescriptions = async (req, res) => {
  try {
    let limitQP = req.query.limit;
    let skipOP = req.query.skip;
    if (limitQP) {
      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    } else {
      limitQP = 30;
    }
    if (skipOP) {
      skipOP = Number(skipOP);
      if (skipOP > 100 || skipOP < 1) {
        limitQP = 0;
      }
    } else {
      skipOP = 0;
    }
    let query = {};
    let prescriptions = await PrescriptionServices.getAllPrescriptions(query,
      limitQP,
      skipOP
    );
    return successResponse(res, messageUtil.success, {
      objectCount : prescriptions.objectsCount,
      objectArray: prescriptions.newDocuments,
    });

  } catch (err) {
    return serverErrorResponse(res, err.message);
    
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

    return successResponse(res, messageUtil.success, findPrescription);
  } catch (err) {
    return serverErrorResponse(res, err.message);
    
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
    return successResponse(res, messageUtil.resourceDeleted);

  } catch (err) {
    return serverErrorResponse(res, err.message);
    
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
