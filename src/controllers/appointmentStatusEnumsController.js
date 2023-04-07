const appointmentStatusEnumsServices = require('../services/appointmentStatusEnumsServices');
const {successResponse, badRequestErrorResponse, notFoundResponse, serverErrorResponse} = require('../utilities/response');



const appointmentStatusEnums = {

    // Add Appointment Status Enum

    addAppointmentStatusEnums: async (req, res) => {
        try {
            let query = {
                ...req.body,
            };
            let data = await appointmentStatusEnumsServices.addAppointmentStatusEnums(query);

            return successResponse(res, "Appointment Status Added successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get AppointmentStatusEnums By Id

    getAppointmentStatusEnums: async (req, res) => {
        try {
            let data = await appointmentStatusEnumsServices.getAppointmentStatusEnums({ _id: req.params.id });
            if(!data) return successResponse(res, "No Record Found", {})

            return successResponse(res, "Success", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get list of AppointmentStatusEnums

    getAllAppointmentStatusEnums: async (req, res) => {
        try {
            let query = {
                limit: req.query.limit,
                skip: req.query.skip
            }
            let objectArray = await appointmentStatusEnumsServices.getAllAppointmentStatusEnums(query);

            return successResponse(res, "Success", objectArray, objectArray.length);
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },

    // Update AppointmentStatusEnums by Id

    updateAppointmentStatusEnums: async (req, res) => {
        try {
            let data = await appointmentStatusEnumsServices.updateAppointmentStatusEnums(
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