const {
  successResponse,
  badRequestErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../utilities/response");
const searchQuery = require("../utilities/searchQuery");
const Services = require("../services/commonServices");
const RelationshipToSubscriberSchema = require("../schemas/relationshipToSubscriberEnumSchema");

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
      let query = {
        _id: req.params.id,
      };
      let data = await Services.getOne({
        schemaName: RelationshipToSubscriberSchema,
        query,
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

      let objectArray = await Services.getMany({
        schemaName: RelationshipToSubscriberSchema,
        limit,
        skip,
      });
      let objectCount = await Services.count({
        schemaName: RelationshipToSubscriberSchema,
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
};

module.exports = relationshipToSubscriber;
