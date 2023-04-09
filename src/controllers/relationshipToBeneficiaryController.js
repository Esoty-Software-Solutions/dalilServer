const relationshipToBeneficiaryServices = require('../services/relationshipToSubscriberEnumServices');
const {successResponse, badRequestErrorResponse, notFoundResponse, serverErrorResponse} = require('../utilities/response');



const relationshipToBeneficiary = {

    // Add Relationship to beneficiary Enum

    addrelationshipToSubscriberEnum: async (req, res) => {
        try {
            let query = {
                ...req.body,
            };
            let data = await relationshipToBeneficiaryServices.addrelationshipToSubscriberEnum(query);

            return successResponse(res, "Relation to Beneficiary Added successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get relationshipToSubscriberEnum By Id

    getrelationshipToSubscriberEnum: async (req, res) => {
        try {
            let data = await relationshipToBeneficiaryServices.getRelationshipToBeneficiaryEnum({ _id: req.params.id });
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
            let objectArray = await relationshipToBeneficiaryServices.getAllrelationshipToSubscriberEnum(query);

            return successResponse(res, "Success", objectArray, objectArray.length);
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },

    // Update relationshipToSubscriberEnum by Id

    updaterelationshipToSubscriberEnum: async (req, res) => {
        try {
            let data = await relationshipToBeneficiaryServices.updaterelationshipToSubscriberEnum(
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

module.exports = relationshipToBeneficiary;