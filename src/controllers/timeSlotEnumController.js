const {
  successResponse,
  badRequestErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../utilities/response");
const Services = require("../services/commonServices");
const TimeSlotEnumSchema = require("../schemas/timeSlotEnumSchema");

const timeSlotEnum = {
  // Add Time Slot Enum

  addTimeSlotEnum: async (req, res) => {
    try {
      const data = await Services.createOne({
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
      const query = {
        _id: req.params.id,
      };
      const data = await Services.getOne({
        schemaName: TimeSlotEnumSchema,
        query,
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
      const limit = req.query.limit;
      const skip = req.query.skip;
      const objectArray = await Services.getMany({
        schemaName: TimeSlotEnumSchema,
        limit,
        skip,
      });

      const objectCount = await Services.count({
        schemaName: TimeSlotEnumSchema,
      });
      return successResponse(res, "Success", objectArray, objectCount);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Update timeSlotEnum by Id

  updateTimeSlotEnum: async (req, res) => {
    try {
      const query = { _id: req.params.id };
      const data = await Services.updateOne({
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
};

module.exports = timeSlotEnum;
