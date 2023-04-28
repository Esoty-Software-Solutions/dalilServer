const {
  successResponse,
  badRequestErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../utilities/response");
const {getSearchQuery} = require("../utilities/searchQuery");
const Services = require("../services/commonServices");
const RelationshipToSubscriberSchema = require("../schemas/relationshipToSubscriberEnumSchema");
const { messageUtil } = require("../utilities/message");

const relationshipToSubscriber = {
  // Add Relationship to beneficiary Enum

  addrelationshipToSubscriberEnum: async (req, res) => {
    try {
      let data = await Services.createOne({
        schemaName: RelationshipToSubscriberSchema,
        body: req.body,
      });

      return successResponse(
        res,
        "Relation to Beneficiary Added successfully",
        data
      );
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get relationshipToSubscriberEnum By Id

  getrelationshipToSubscriberEnum: async (req, res) => {
    try {
      let body = {
        _id: req.params.id,
      };
      let data = await Services.getOne({
        schemaName: RelationshipToSubscriberSchema,
        body,
      });
      if (!data) return notFoundResponse(res, "No Record Found");
      return successResponse(res, "Success", data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get list of relationshipToSubscriberEnum

  getAllrelationshipToSubscriberEnum: async (req, res) => {
    try {
      let limit = req.query.limit;
      let skip = req.query.skip;
      let filterQP = {}; // temporary
      if(req.query.searchQuery) filterQP = getSearchQuery(["backendName","arabicName", "englishName","_id"], req.query.searchQuery)
      let objectArray = await Services.getMany({
        schemaName: RelationshipToSubscriberSchema,
        query : filterQP,
        limit : limit,
        skip : skip,
      });
      let objectCount = await Services.count({
        schemaName: RelationshipToSubscriberSchema,
        query : filterQP
      });
      return successResponse(res, "Success", objectArray, objectCount);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Update relationshipToSubscriberEnum by Id

  updaterelationshipToSubscriberEnum: async (req, res) => {
    try {
      let query = { _id: req.params.id };
      let data = await Services.updateOne({
        schemaName: RelationshipToSubscriberSchema,
        query,
        body: req.body,
      });

      if (!data) {
        return badRequestErrorResponse(res, "Record Not Found");
      }

      return successResponse(
        res,
        "RelationToBeneficiaryEnum updated successfully",
        data
      );
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },
  deleterelationshipToSubscriberEnum: async (req, res) => {
    try {
      let body = {
        _id: req.params.id,
      };

      let data = await Services.deleteOne({
        schemaName: RelationshipToSubscriberSchema,
        body
       });

      if (!data) {
        return badRequestErrorResponse(res, messageUtil.resourceNotFound);
      }

      return successResponse(res, messageUtil.resourceDeleted, data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },
};

module.exports = relationshipToSubscriber;
