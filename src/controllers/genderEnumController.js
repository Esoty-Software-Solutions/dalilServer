const Services = require("../services/commonServices");
const GenderEnums = require("../schemas/genderEnumSchema");
const {
  successResponse,
  badRequestErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../utilities/response");
const { messageUtil } = require("../utilities/message");
const {searchQuery} = require("../utilities/searchQuery");
const genderEnum = {
  // Add Appointment Status Enum

  addgenderEnum: async (req, res) => {
    try {
      let data = await Services.createOne({
        schemaName: GenderEnums,
        body: req.body,
      });

      return successResponse(res, messageUtil.resourceCreated, data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get genderEnum By Id

  getgenderEnum: async (req, res) => {
    try {
      let body = {
        _id: req.params.id,
      };
      let data = await Services.getOne({
        schemaName: GenderEnums,
        body,
      });
      if (!data) return successResponse(res, messageUtil.resourceNotFound, {});

      return successResponse(res, messageUtil.success, data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get list of genderEnum

  getAllgenderEnum: async (req, res) => {
    try {
      let limit = req.query.limit;
      let skip = req.query.skip;
      let searchquery = {};
      let query = {};
      const searchFields = ["backendName", "englishName",'_id'];
      if (req.query.id) {
        query._id = req.query.id;
      }

      if (req.query.searchQuery) {
        searchquery = searchQuery(searchFields, req.query.searchQuery);
        query = { ...query, ...searchquery };
      }
      let objectArray = await Services.getMany({
        schemaName: GenderEnums,
        query,
        limit,
        skip,
      });

      let objectCount = await Services.count({
        schemaName: GenderEnums,
        query : query
      });

      return successResponse(
        res,
        messageUtil.success,
        objectArray,
        objectCount
      );
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Update genderEnum by Id

  updategenderEnum: async (req, res) => {
    try {
      let query = { _id: req.params.id };
      let data = await Services.updateOne({
        schemaName: GenderEnums,
        query,
        body: req.body,
      });

      if (!data) {
        return badRequestErrorResponse(res, "Record Not Found");
      }

      if (!data) {
        return badRequestErrorResponse(res, messageUtil.resourceNotFound);
      }

      return successResponse(res, messageUtil.resourceUpdated, data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },
};

module.exports = genderEnum;
