const Services = require("../services/commonServices");
const AppointmentStatusEnumSchema = require("../schemas/appointmentStatusEnumsSchema");
const {
  successResponse,
  badRequestErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../utilities/response");

const appointmentStatusEnums = {
  // Add Appointment Status Enum

  addappointmentStatusEnums: async (req, res) => {
    try {
      let data = await Services.createOne({
        schemaName: AppointmentStatusEnumSchema,
        body: req.body,
      });

      return successResponse(
        res,
        "Appointment Status Added successfully",
        data
      );
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get appointmentStatusEnums By Id

  getappointmentStatusEnums: async (req, res) => {
    try {
      let query = {
        _id: req.params.id,
      };
      let data = await Services.getOne({
        schemaName: AppointmentStatusEnumSchema,
        query,
      });
      if (!data) return successResponse(res, "No Record Found", {});

      return successResponse(res, "Success", data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get list of appointmentStatusEnums

  getAllappointmentStatusEnums: async (req, res) => {
    try {
      let limit = req.query.limit;
      let skip = req.query.skip;
      let objectArray = await Services.getMany({
        schemaName: AppointmentStatusEnumSchema,
        limit,
        skip,
      });

      let objectCount = await Services.count({
        schemaName: AppointmentStatusEnumSchema,
      });
      return successResponse(res, "Success", objectArray, objectCount);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Update appointmentStatusEnums by Id

  updateappointmentStatusEnums: async (req, res) => {
    try {
      let query = { _id: req.params.id };
      let data = await Services.updateOne({
        schemaName: AppointmentStatusEnumSchema,
        query,
        body: req.body,
      });

      if (!data) {
        return badRequestErrorResponse(res, "Record Not Found");
      }

      return successResponse(
        res,
        "Appointment Status Enums updated successfully",
        data
      );
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },
};

module.exports = appointmentStatusEnums;
