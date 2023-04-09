const relationshipToBeneficiaryServices = require('../services/relationshipToBeneficiaryEnumServices');
const {successResponse, badRequestErrorResponse, notFoundResponse, serverErrorResponse} = require('../utilities/response');



const relationshipToBeneficiary = {

    // Add Relationship to beneficiary Enum

    addRelationshipToBeneficiaryEnum: async (req, res) => {
        try {
            let query = {
                ...req.body,
            };
            let data = await relationshipToBeneficiaryServices.addRelationshipToBeneficiaryEnum(query);

            return successResponse(res, "Relation to Beneficiary Added successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get RelationshipToBeneficiaryEnum By Id

    getRelationshipToBeneficiaryEnum: async (req, res) => {
        try {
            let data = await relationshipToBeneficiaryServices.getRelationshipToBeneficiaryEnum({ _id: req.params.id });
            if(!data) return notFoundResponse(res, "No Record Found")
            return successResponse(res, "Success", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get list of relationshipToBeneficiaryEnum

    getAllRelationshipToBeneficiaryEnum: async (req, res) => {
        try {
            let query = {
                limit: req.query.limit,
                skip: req.query.skip
            }
            let objectArray = await relationshipToBeneficiaryServices.getAllRelationshipToBeneficiaryEnum(query);

            return successResponse(res, "Success", objectArray, objectArray.length);
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },

    // Update RelationshipToBeneficiaryEnum by Id

    updateRelationshipToBeneficiaryEnum: async (req, res) => {
        try {
            let data = await relationshipToBeneficiaryServices.updateRelationshipToBeneficiaryEnum(
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