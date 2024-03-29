const {
  successResponse,
  badRequestErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../utilities/response");
const Services = require("../services/commonServices");
const AccountStatusEnumSchema = require("../schemas/accountStatusEnumSchema");
const { getSearchQuery } = require("../utilities/searchQuery");

const accountStatusEnum = {
  // Add Account Status Enum

  addAccountStatusEnum: async (req, res) => {
    try {
      let data = await Services.createOne({
        schemaName: AccountStatusEnumSchema,
        body: req.body,
      });

      return successResponse(
        res,
        "Account Status Enum Added successfully",
        data
      );
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get accountStatusEnum By Id

  getAccountStatusEnum: async (req, res) => {
    try {
      let body = {
        _id: req.params.id,
      };
      let data = await Services.getOne({
        schemaName: AccountStatusEnumSchema,
        body,
      });
      if (!data) return notFoundResponse(res, "No Record Found");
      return successResponse(res, "Success", data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get list of accountStatusEnum

  getAllAccountStatusEnum: async (req, res) => {
    try {
      let limit = req.query.limit;
      let skip = req.query.skip;
      let filterQP = {}; // temporary
      if(req.query.searchQuery) filterQP = getSearchQuery(["backendName","arabicName", "englishName","_id"], req.query.searchQuery)
      
      let objectArray = await Services.getMany({
        schemaName: AccountStatusEnumSchema,
        query : filterQP,
        limit : limit,
        skip : skip,
      });

      let objectCount = await Services.count({
        schemaName: AccountStatusEnumSchema,
        query : filterQP
      });
      return successResponse(res, "Success", objectArray, objectCount);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Update accountStatusEnum by Id

  updateAccountStatusEnum: async (req, res) => {
    try {
      let query = { _id: req.params.id };
      let data = await Services.updateOne({
        schemaName: AccountStatusEnumSchema,
        query,
        body: req.body,
      });

      if (!data) {
        return badRequestErrorResponse(res, "Record Not Found");
      }

      return successResponse(
        res,
        "Account Status Enum updated successfully",
        data
      );
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },
};

module.exports = accountStatusEnum;
