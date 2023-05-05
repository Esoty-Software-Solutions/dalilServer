const mongoose = require("mongoose");
const RoleSchema = require("../schemas/RoleSchema");
const { successResponse, badRequestErrorResponse, notFoundResponse, serverErrorResponse } = require('../utilities/response');

//----------Add Review------------------------------------------------\\
const getAllRole = async (req, res) => {
    try {

        let appointment = await RoleSchema.find();
        let appointmentCount = await RoleSchema.find().countDocuments();
        return successResponse(res, "role list", appointment,appointmentCount);

    } catch (error) {
        console.log(error);
        return serverErrorResponse(res, error);
    }
};

module.exports = {
    getAllRole
};
