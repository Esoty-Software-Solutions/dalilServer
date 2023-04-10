const appointmentStatusEnumsServices = require('../services/appointmentStatusEnumsServices');
const {successResponse, badRequestErrorResponse, notFoundResponse, serverErrorResponse} = require('../utilities/response');



const appointmentStatusEnums = {

    // Add Appointment Status Enum

    addappointmentStatusEnums: async (req, res) => {
        try {
            let query = {
                ...req.body,
            };
            let data = await appointmentStatusEnumsServices.addappointmentStatusEnums(query);

            return successResponse(res, "Appointment Status Added successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get appointmentStatusEnums By Id

    getappointmentStatusEnums: async (req, res) => {
        try {
            let data = await appointmentStatusEnumsServices.getappointmentStatusEnums({ _id: req.params.id });
            if(!data) return successResponse(res, "No Record Found", {})

            return successResponse(res, "Success", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get list of appointmentStatusEnums

    getAllappointmentStatusEnums: async (req, res) => {
        try {
            let query = {
                limit: req.query.limit,
                skip: req.query.skip
            }
            let objectArray = await appointmentStatusEnumsServices.getAllappointmentStatusEnums(query);

            return successResponse(res, "Success", objectArray, objectArray.length);
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },

    // Update appointmentStatusEnums by Id

    updateappointmentStatusEnums: async (req, res) => {
        try {
            let data = await appointmentStatusEnumsServices.updateappointmentStatusEnums(
                { _id: req.params.id },
                {...req.body}
            );

            if (!data) {
                return badRequestErrorResponse(res, "Record Not Found")
              }

              return successResponse(res, "Appointment Status Enums updated successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    }
}

module.exports = appointmentStatusEnums;