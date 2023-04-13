const genderEnumServices = require("../services/genderEnumServices");
const {
  successResponse,
  badRequestErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../utilities/response");
const { messageUtil } = require("../utilities/message");
const searchQuery = require("../utilities/searchQuery");
const genderEnum = {
  // Add Appointment Status Enum

  addgenderEnum: async (req, res) => {
    try {
      let query = {
        ...req.body,
      };
      let data = await genderEnumServices.addgenderEnum(query);

      return successResponse(res, messageUtil.resourceCreated, data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get genderEnum By Id

  getgenderEnum: async (req, res) => {
    try {
      let data = await genderEnumServices.getgenderEnum({
        _id: req.params.id,
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
      let query = {
        limit: req.query.limit,
        skip: req.query.skip,
      };

      const searchFields = ["backendName", "englishName"];

      // Define the search query
      let searchquery;
      if (req.query.searchQuery) {
        searchquery = searchQuery(searchFields, req.query.searchQuery);
      }
      let objectArray = await genderEnumServices.getAllgenderEnum(searchquery, query);
      return successResponse(
        res,
        messageUtil.success,
        objectArray,
        objectArray.length
      );
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Update genderEnum by Id

  updategenderEnum: async (req, res) => {
    try {
      let data = await genderEnumServices.updategenderEnum(
        { _id: req.params.id },
        { ...req.body }
      );

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
