const timeSlotEnumServices = require('../services/timeSlotEnumServices');
const {successResponse, badRequestErrorResponse, notFoundResponse, serverErrorResponse} = require('../utilities/response');



const timeSlotEnum = {

    // Add Time Slot Enum

    addTimeSlotEnum: async (req, res) => {
        try {
            let query = {
                ...req.body,
            };
            let data = await timeSlotEnumServices.addTimeSlotEnum(query);

            return successResponse(res, "Time Slot Enum Added successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get timeSlotEnum By Id

    getTimeSlotEnum: async (req, res) => {
        try {
            let data = await timeSlotEnumServices.getTimeSlotEnum({ _id: req.params.id });
            if(!data) return notFoundResponse(res, "No Record Found")
            return successResponse(res, "Success", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get list of timeSlotEnum

    getAlltimeSlotEnum: async (req, res) => {
        try {
            let query = {
                limit: req.query.limit,
                skip: req.query.skip
            }
            let objectArray = await timeSlotEnumServices.getAllTimeSlotEnum(query);

            return successResponse(res, "Success", objectArray, objectArray.length);
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },

    // Update timeSlotEnum by Id

    updateTimeSlotEnum: async (req, res) => {
        try {
            let data = await timeSlotEnumServices.updateTimeSlotEnum(
                { _id: req.params.id },
                {...req.body}
            );

            if (!data) {
                return badRequestErrorResponse(res, "Record Not Found")
              }

              return successResponse(res, "Time Slot Enum updated successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    }
}

module.exports = timeSlotEnum;