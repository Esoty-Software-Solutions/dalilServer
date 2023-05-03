const Services = require("../services/commonServices");
const {
  successResponse,
  badRequestErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../utilities/response");
const { messageUtil } = require("../utilities/message");
const {searchQuery,getSearchQuery} = require("../utilities/searchQuery");
const CitySchema = require("../schemas/citiesSchema");
const mongoose = require('mongoose');

const city = {
  // Add Appointment Status Enum

  addCity: async (req, res) => {
    console.log("in the add city controller",req.body);
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
      let body = {
        _id: mongoose.Types.ObjectId(req.params.id),
      };
      console.log(body);
      let data = await Services.getOne({
        schemaName: CitySchema,
        body,
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

      const searchFields = ["backendName", "englishName",'arabicName',"_id"];

      // Define the search query
      let searchquery = {};
      let query = {};

      if (req.query.id) {
        query._id = req.query.id;
      }

      if (req.query.searchQuery) {
        searchquery = getSearchQuery(searchFields, req.query.searchQuery);
        query = { ...query, ...searchquery };
      }
      console.log(query,"query");
      console.log( req.query.searchQuery,"searchQuery");
     
      let body='';
      let objectArray = await Services.getMany({
        schemaName: CitySchema,
        body:body,
        query: query,
        limit,
        skip,
        select: "-__v ",
      });
   
      let objectCount = await Services.count({ schemaName: CitySchema , query : query });
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
  // delete by id
  deleteCity: async (req, res) => {
    try {
      let body = {
        _id: req.params.id,
      };

      let data = await Services.deleteOne({
        schemaName: CitySchema,
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

module.exports = city;
