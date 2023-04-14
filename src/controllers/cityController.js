const cityServices = require("../services/cityServices");
const {
  successResponse,
  badRequestErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../utilities/response");
const { messageUtil } = require("../utilities/message");
const searchQuery = require("../utilities/searchQuery");
const city = {
  // Add Appointment Status Enum

  addCity: async (req, res) => {
    console.log("in the add city controller");
    try {
      let query = {
        ...req.body,
      };
      let data = await cityServices.addCity(query);

      return successResponse(res, messageUtil.resourceCreated, data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get City By Id

  getCity: async (req, res) => {
    try {
      let data = await cityServices.getCity({
        _id: req.params.id,
      });
      if (!data) return successResponse(res, messageUtil.resourceNotFound, {});

      return successResponse(res, messageUtil.success, data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get list of City

  getAllCity: async (req, res) => {
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
      let objectArray = await cityServices.getAllCity(searchquery, query);
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

  // Update City by Id

  updateCity: async (req, res) => {
    try {
      let data = await cityServices.updateCity(
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

module.exports = city;
