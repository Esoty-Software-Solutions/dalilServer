const relationshipToSubscriberServices = require('../services/relationshipToSubscriberEnumServices');
const {successResponse, badRequestErrorResponse, notFoundResponse, serverErrorResponse} = require('../utilities/response');



const relationshipToSubscriber = {

    // Add Relationship to beneficiary Enum

    addrelationshipToSubscriberEnum: async (req, res) => {
        try {
            let query = {
                ...req.body,
            };
            let data = await relationshipToSubscriberServices.addrelationshipToSubscriberEnum(query);

            return successResponse(res, "Relation to Beneficiary Added successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get relationshipToSubscriberEnum By Id

    getrelationshipToSubscriberEnum: async (req, res) => {
        try {
            let data = await relationshipToSubscriberServices.getrelationshipToSubscriberEnum({ _id: req.params.id });
            if(!data) return notFoundResponse(res, "No Record Found")
            return successResponse(res, "Success", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get list of relationshipToSubscriberEnum

    getAllrelationshipToSubscriberEnum: async (req, res) => {
        try {
            let query = {
                limit: req.query.limit,
                skip: req.query.skip
            }
            let objectArray = await relationshipToSubscriberServices.getAllrelationshipToSubscriberEnum(query);

            return successResponse(res, "Success", objectArray, objectArray.length);
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },

    // Update relationshipToSubscriberEnum by Id

    updaterelationshipToSubscriberEnum: async (req, res) => {
        try {
            let data = await relationshipToSubscriberServices.updaterelationshipToSubscriberEnum(
                { _id: req.params.id },
                {...req.body}
            );

            if (!data) {
                return badRequestErrorResponse(res, "Record Not Found")
              }

              return successResponse(res, "RelationToBeneficiaryEnum updated successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    }
}

module.exports = relationshipToSubscriber;