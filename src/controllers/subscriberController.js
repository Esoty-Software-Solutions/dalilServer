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
// const { beneficiaries } = require("../schemas/subscriberSchema");
const checkFeilds = require("../utilities/checkFields");
const {searchQuery, getSearchQuery} = require("../utilities/searchQuery");

const createSubscriber = async (req, res) => {
  try {
    console.log("createSubscriber");
    //if body contain beneficiaries
    let beneficiaries = [];
    if (req.body.beneficiaries) {
      for (let i = 0; i < req.body.beneficiaries.length; i++) {

        //Create beneficiary
        try {
          let beneficiary = await SubscriberServices.createBeneficiaries(
            req.body.beneficiaries[i]
          );
          //push beneficiary id in array
          beneficiaries.push(beneficiary._id.toString());
        } catch (error) {
          console.log(error);
          return serverErrorResponse(res, error.message);
        }
      }
    }

    //Push beneficiary ids array in req.body
    if (beneficiaries.length > 0) {
      req.body.beneficiaries = beneficiaries;
    }
    console.log(req.body);
    //create subscriber
    const doc = await SubscriberServices.createSubscriber({
      ...req.body,
    });
    return successResponse(res, messageUtil.resourceCreated, doc);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const updateSubscriber = async (req, res) => {
  try {
    // Update document and register the user

    const document = await SubscriberServices.updateSubscriber(
      {
        _id: req.params.subscriberId,
      },
      { ...req.body }
    );

    return successResponse(res, messageUtil.resourceUpdated, document);
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
    
    let filterQP = {}; // temporary
    if(req.query.searchQuery) filterQP = getSearchQuery(["firstName","secondName", "thirdName" , "lastName","_id"], req.query.searchQuery)
    const [docArray, docCount] = await SubscriberServices.getSubscribers(
      filterQP,
      sortByQP,
      skipQP,
      limitQP
    );

    let message = "good";
    if (docArray.length === 0) message = "list is empty change your query";

    return successResponse(res, message, {
      objectCount: docCount,
      objectArray: docArray,
    });
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const getSubscriber = async (req, res) => {
  let subscriber = await SubscriberServices.getSubscriber({
    _id: req.params.subscriberId,
  });

  if (!subscriber) {
    return notFoundResponse(res, messageUtil.notFound);
  }
  return successResponse(res, messageUtil.success, subscriber);
};

const getBeneficiaries = async (req, res) => {
  let subscriber = await SubscriberServices.getSubscriber({
    _id: req.params.subscriberId,
  });

  if (!subscriber) {
    return notFoundResponse(res, messageUtil.notFound);
  }
  return successResponse(res, messageUtil.success, {
    objectCount: subscriber.beneficiaries.length,
    objectArray: subscriber.beneficiaries,
  });
};

const getBeneficiary = async (req, res) => {
  let beneficiary = await SubscriberServices.getBeneficiary({
    _id: req.params.beneficiaryId,
  });

  if (!beneficiary) {
    return notFoundResponse(res, messageUtil.notFound);
  }
  return successResponse(res, messageUtil.success, beneficiary);
};

const updateBeneficiary = async (req, res) => {
  let beneficiary = await SubscriberServices.updateBeneficiary(
    {
      _id: req.params.beneficiaryId,
    },
    { ...req.body }
  );

  if (!beneficiary) {
    return notFoundResponse(res, messageUtil.notFound);
  }
  return successResponse(res, messageUtil.success, beneficiary);
};

const createBeneficiaryForSubscriber = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      secondName,
      birthdate,
      gender,
      relationshipToSubscriber,
    } = req.body;

    //checking required fields in beneficiary schema
    const isError = checkFeilds(
      {
        firstName,
        lastName,
        secondName,
        birthdate,
        gender,
        relationshipToSubscriber,
      },
      res
    );
    if (isError) return;

    let beneficiary = await SubscriberServices.createBeneficiaries(req.body);
    //Updating subscriber service
    let updateSubscriber = await SubscriberServices.updateSubscriberById(
      { _id: req.params.subscriberId },
      { $push: { beneficiaries: beneficiary._id } }
    );

    return successResponse(res, messageUtil.resourceCreated, beneficiary);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

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

module.exports = {
  createSubscriber,
  updateSubscriber,
  getSubscriber,
  getSubscribers,
  createSubscribersCSV,
  getBeneficiaries,
  createBeneficiaryForSubscriber,
  getBeneficiary,
  updateBeneficiary,
};
