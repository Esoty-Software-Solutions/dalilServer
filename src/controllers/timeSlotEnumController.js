const {
  successResponse,
  badRequestErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../utilities/response");
const Services = require("../services/commonServices");
const TimeSlotEnumSchema = require("../schemas/timeSlotEnumSchema");
const { getSearchQuery } = require("../utilities/searchQuery");
const { messageUtil } = require("../utilities/message");

const timeSlotEnum = {
  // Add Time Slot Enum

  addTimeSlotEnum: async (req, res) => {
    try {
      let data = await Services.createOne({
        schemaName: TimeSlotEnumSchema,
        body: req.body,
      });

      return successResponse(res, "Time Slot Enum Added successfully", data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get timeSlotEnum By Id

  getTimeSlotEnum: async (req, res) => {
    try {
      let body = {
        _id: req.params.id,
      };
      let data = await Services.getOne({
        schemaName: TimeSlotEnumSchema,
        body,
      });
      if (!data) return notFoundResponse(res, "No Record Found");
      return successResponse(res, "Success", data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get list of timeSlotEnum

  getAlltimeSlotEnum: async (req, res) => {
    try {
      let limit = req.query.limit;
      let skip = req.query.skip;
      let filterQP = {}; // temporary
      if(req.query.searchQuery) filterQP = getSearchQuery(["backendName","arabicName", "englishName","_id"], req.query.searchQuery)
      
      let objectArray = await Services.getMany({
        schemaName: TimeSlotEnumSchema,
        query : filterQP,
        limit : limit,
        skip : skip,
      });

      let objectCount = await Services.count({
        schemaName: TimeSlotEnumSchema,
        query : filterQP
      });
      return successResponse(res, "Success", objectArray, objectCount);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Update timeSlotEnum by Id

  updateTimeSlotEnum: async (req, res) => {
    try {
      let query = { _id: req.params.id };
      let data = await Services.updateOne({
        schemaName: TimeSlotEnumSchema,
        query,
        body: req.body,
      });

      if (!data) {
        return badRequestErrorResponse(res, "Record Not Found");
      }

      return successResponse(res, "Time Slot Enum updated successfully", data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },
  deleteTimeSlotEnum: async (req, res) => {
    try {
      let body = {
        _id: req.params.id,
      };

      let data = await Services.deleteOne({
        schemaName: TimeSlotEnumSchema,
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

module.exports = timeSlotEnum;
