const SubscriberServices = require("../services/subscriberServices");
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} = require("../utilities/response");
const { messageUtil } = require("../utilities/message");
const csv = require("csvtojson");
const path = require("path");
const fs = require("fs");

let checkFields = (fields, res) => {
  const errors = [];

  Object.keys(fields).forEach((key) => {
    if (!fields[key]) errors.push(key);
  });

  if (errors.length > 0) {
    res.status(400).send({
      text: `These fields can not be empty for any record ${errors} `,
      error: true,
    });
  }

  if (errors.length > 0) {
    return true;
  } else {
    return false;
  }
};

const createSubscriber = async (req, res) => {
  try {
    console.log("createSubscriber");
    const doc = await SubscriberServices.createSubscriber({ ...req.body });
    return successResponse(res, messageUtil.resourceCreated, doc);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const updateSubscriber = async (req, res) => {
  try {
    // Update document and register the user
    let obj = {
      ...req.body,
    };
    console.log("req.files: ", req.files);
    if (req.files.length > 0) {
      console.log("in if");

      req.body = {
        ...req.body,
        file: req.files[0].location,
      };

      obj.file = req.files[0].location;
    }
    console.log("Obj: ", obj);
    const document = await SubscriberServices.updateSubscriber(
      {
        _id: req.params.subscriberId,
        "beneficiaries._id": req.body.beneficiaryId,
      },
      { $set: { "beneficiaries.$.medicalFiles": req.body } }
    );
    console.log(
      "🚀 ~ file: subscriberController.js:59 ~ updateSubscriber ~ document:",
      document
    );

    return res.status(200).json(messageUtil.resourceUpdated);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const getSubscribers = async (req, res) => {
  try {
    let limitQP = Number(req.query.limit) ?? 100;
    if (limitQP > 100) limitQP = 100;
    if (limitQP < 1) limitQP = 1;

    let skipQP = Number(req.query.skip) ?? 0;
    if (skipQP < 0) skipQP = 0;

    let sortByQP = Number(req.query.sortBy) ?? { userId: 1 };

    const filterQP = null; // temporary

    const [docArray, docCount] = await SubscriberServices.getSubscribers(
      filterQP,
      sortByQP,
      skipQP,
      limitQP
    );

    let message = "good";
    if (docArray.length === 0) message = "list is empty change your query";

    return successResponse(res, message, docArray, docCount);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const getSubscriber = async (req, res) => {};
const deleteSubscriber = async (req, res) => {};

const createSubscribersCSV = async (req, res) => {
  await csv()
    .fromFile(req.files[0].path)
    .then(async (result) => {
      try {
        // result is the array of json objects
        //this loop is checking all the required fields but it will not check enum valid values
        for (let i = 0; i < result.length; i++) {
          let subscriberData = await SubscriberServices.getSubscriber({
            _id: result[i].employeeId,
          });

          if (!subscriberData) {
            return res.status(404).json({
              message: `Please provide valid employee id for record ${i + 1}`,
            });
          }
          //checking required fields in beneficiary schema
          const isError = checkFields(
            {
              FirstName: result[i].firstName,
              LastName: result[i].lastName,
              MiddleName: result[i].middleName,
              birthdate: result[i].birthdate,
              gender: result[i].gender,
              relationshipToSubscriber: result[i].relationshipToSubscriber,
            },
            res
          );
          if (isError) return;
        }
        //Creating records in beneficiary schema
        for (let i = 0; i < result.length; i++) {
          let beneficiary = await SubscriberServices.createBeneficiaries(
            result[i]
          );
          //Updating subscriber service
          let updateSubscriber = await SubscriberServices.updateSubscriberById(
            { _id: result[i].employeeId },
            { $push: { beneficiaries: beneficiary } }
          );
        }
        //unlinking csv file from disk
        fs.unlinkSync(path.resolve(req.files[0].path));

        return successResponse(res, messageUtil.resourceCreated);
      } catch (error) {
        console.log(error);
        return serverErrorResponse(res, error.message);
      }
    });
};

const createMedicalFile = async (req, res) => {
  try {
    // Update document and register the user

    console.log("req.files: ", req.files);
    if (req.files.length > 0) {
      console.log("in if");

      req.body = {
        ...req.body,
        file: req.files[0].location,
      };
    }
    const document = await SubscriberServices.createMedicalFile(
      req.body
      // {
      //   _id: req.params.subscriberId,
      //   "beneficiaries._id": req.body.beneficiaryId,
      // },
      // { $set: { "beneficiaries.$.medicalFiles": req.body } }
    );

    const updateBeneficiary = await SubscriberServices.updateBeneficiaries(
      { _id: req.params.beneficiaryId },
      { medicalFiles: document._id }
    );

    return res.status(200).json(messageUtil.resourceUpdated);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};
module.exports = {
  createSubscriber,
  updateSubscriber,
  getSubscriber,
  deleteSubscriber,
  getSubscribers,
  createSubscribersCSV,
  createMedicalFile,
};
