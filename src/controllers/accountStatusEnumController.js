const accountStatusEnumServices = require('../services/accountStatusEnumServices');
const {successResponse, badRequestErrorResponse, notFoundResponse, serverErrorResponse} = require('../utilities/response');



const accountStatusEnum = {

    // Add Account Status Enum

    addAccountStatusEnum: async (req, res) => {
        try {
            let query = {
                ...req.body,
            };
            let data = await accountStatusEnumServices.addAccountStatusEnum(query);

            return successResponse(res, "Account Status Enum Added successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get accountStatusEnum By Id

    getAccountStatusEnum: async (req, res) => {
        try {
            let data = await accountStatusEnumServices.getAccountStatusEnum({ _id: req.params.id });
            if(!data) return notFoundResponse(res, "No Record Found")
            return successResponse(res, "Success", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get list of accountStatusEnum

    getAllAccountStatusEnum: async (req, res) => {
        try {
            let query = {
                limit: req.query.limit,
                skip: req.query.skip
            }
            let objectArray = await accountStatusEnumServices.getAllAccountStatusEnum(query);

            return successResponse(res, "Success", objectArray, objectArray.length);
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },

    // Update accountStatusEnum by Id

    updateAccountStatusEnum: async (req, res) => {
        try {
            let data = await accountStatusEnumServices.updateAccountStatusEnum(
                { _id: req.params.id },
                {...req.body}
            );

            if (!data) {
                return badRequestErrorResponse(res, "Record Not Found")
              }

              return successResponse(res, "Account Status Enum updated successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    }
}

module.exports = accountStatusEnum;