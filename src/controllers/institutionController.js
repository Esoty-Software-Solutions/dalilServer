const InstitutionServices = require("../services/institutionServices");
const {
  successResponse,
  serverErrorResponse,
} = require("../utilities/response");
const { messageUtil } = require("../utilities/message");
require("dotenv").config();
const { getSearchQuery } = require("../utilities/searchQuery");

// class Institution {
const AddInstitution = async (req, res) => {
  try {
    const institute = await InstitutionServices.getInstitutionDetails({
      name: req.body.name,
    });
    console.log(req.body)
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
    return successResponse(res, messageUtil.resourceCreated, institution);
  } catch (err) {
    return serverErrorResponse(res, err.message);
  }
};

const AllInstitutions = async (req, res) => {
  try {
    let limit = Number(req.query.limit);
    let skip = Number(req.query.skip);
    if(limit > 100 || limit < 1) {
      limit = 0
    } 
    if (skip < 0) skip = 0;
    let query={};
    if(req.query.searchQuery) query = getSearchQuery(["name" , "phoneNumber" ,"email","_id" ], req.query.searchQuery , query);
    let institutions = await InstitutionServices.getAllInstitution(query , req.query.limit , req.query.skip);
    return successResponse(res, messageUtil.success, {
      objectCount: institutions.objectsCount,
      objectArray: institutions.newDocuments,
    });
  } catch (err) {
    return serverErrorResponse(res, err.message);
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
    return successResponse(res, messageUtil.success, findInstitution);
  } catch (err) {
    return serverErrorResponse(res, err.message);
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
    return successResponse(res, messageUtil.resourceDeleted);
  } catch (err) {
    return serverErrorResponse(res, err.message);
  }
};

const UpdateInstitution = async (req, res) => {
  const { institutionId } = req.params;

  try {
    let institution = await InstitutionServices.updateInstitution(
      { _id: institutionId },
      { ...req.body },
    );

    if (!institution) {
      return res.status(404).json({ message: "No institute found" });
    }
    return successResponse(res, messageUtil.resourceUpdated, institution);
  } catch (err) {
    return serverErrorResponse(res, err.message);
  }
};

module.exports = {
  AddInstitution,
  UpdateInstitution,
  DeleteInstitution,
  InstitutionById,
  AllInstitutions,
};
