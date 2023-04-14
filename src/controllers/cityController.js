const Services = require("../services/commonServices");
const {
  successResponse,
  badRequestErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../utilities/response");
const { messageUtil } = require("../utilities/message");
const searchQuery = require("../utilities/searchQuery");
const CitySchema = require("../schemas/citySchema");

const city = {
  // Add Appointment Status Enum

  addCity: async (req, res) => {
    try {
      let data = await Services.createOne({
        body: req.body,
        schemaName: CitySchema,
      });

      return successResponse(res, messageUtil.resourceCreated, data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get City By Id

  getCity: async (req, res) => {
    try {
      let query = {
        _id: req.params.id,
      };

      let data = await Services.getOne({
        schemaName: CitySchema,
        query,
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
      let limit = req.query.limit;
      let skip = req.query.skip;

      const searchFields = ["backendName", "englishName"];

      // Define the search query
      let searchquery = {};
      let query = {};

      if (req.query.id) {
        query._id = req.query.id;
      }

      if (req.query.searchQuery) {
        searchquery = searchQuery(searchFields, req.query.searchQuery);
        query = { ...query, ...searchquery };
      }

      let objectArray = await Services.getMany({
        schemaName: CitySchema,
        query: query,
        limit,
        skip,
        select: "-__v ",
      });

      let objectCount = await Services.count({ schemaName: CitySchema });
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

  // Update City by Id

  updateCity: async (req, res) => {
    try {
      let query = {
        _id: req.params.id,
      };

      let data = await Services.updateOne({
        schemaName: CitySchema,
        query,
        body: req.body,
        select: "-__v ",
      });

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
