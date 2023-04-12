const InstitutionServices = require("../services/institutionServices");
const aws = require("aws-sdk");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.aws_accessKeyID,
  secretAccessKey: process.env.aws_secretAccessKey,
});
let S3_BUCKET_URL = "https://pistas-bucket.s3.amazonaws.com/";

// class Institution {
const AddInstitution = async (req, res) => {
  try {
    const institute = await InstitutionServices.getInstitutionDetails({
      name: req.body.name,
    });
    if (institute) {
      return res.status(400).json({ error: "Institue already exist" });
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
    let institution = await InstitutionServices.createInstitution(query);
    res.status(200).json({
      institution,
      message: "Institute created successfully",
    });
    //   successResponse(res, messageUtil.ok, institution);
  } catch (err) {
    //   serverErrorResponse(res, err);
    res.status(500).json({ message: err.message });
  }
};

const AllInstitutions = async (req, res) => {
  try {
    let institutions = await InstitutionServices.getAllInstitution();

    if (institutions.length === 0) {
      return res.status(404).json({ message: "No institute found" });
    }

    return res.status(200).json({
      institutions,
      objectCount: institutions.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const InstitutionById = async (req, res) => {
  //destructure queryObject

  const { institution_id } = req.params;

  if (!institution_id) {
    return res.status(404).json({ message: "Please insert institution id" });
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
    let findInstitution = await InstitutionServices.getInstitutionDetails({
      _id: institution_id,
    });
    if (!findInstitution) {
      return res.status(404).json({ message: "No institute found" });
    }
    // let signed_url;
    // if (findInstitution.institute_image) {
    //   signed_url = getSignedUrl(findInstitution.institute_image, expiry_time);
    // }
    return res.status(200).json({
      data: { findInstitution },
      message: "Institution found.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const DeleteInstitution = async (req, res) => {
  try {
    let institution = await InstitutionServices.deleteInstitution({
      _id: req.params.id,
    });
    if (!institution) {
      return res.status(404).json({ message: "No institute found" });
    }
    return res.status(200).json({
      institution,
      message: "Institution delted.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const UpdateInstitution = async (req, res) => {
  const { institutionId } = req.params;

  try {
    let institution = await InstitutionServices.updateInstitution(
      { _id: institutionId },
      { ...req.body }
    );

    if (!institution) {
      return res.status(404).json({ message: "No institute found" });
    }
    return res.status(200).json({
      institution,
      message: "Institution updated successfully.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  AddInstitution,
  UpdateInstitution,
  DeleteInstitution,
  InstitutionById,
  AllInstitutions,
};
