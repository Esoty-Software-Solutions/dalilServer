const relationshipToBeneficiaryServices = require('../services/relationshipToBeneficiaryEnumServices');

const relationshipToBeneficiary = {

    // Add Relationship to beneficiary Enum

    addRelationshipToBeneficiaryEnum: async (req, res) => {
        try {
            let query = {
                ...req.body,
            };
            let data = await relationshipToBeneficiaryServices.addRelationshipToBeneficiaryEnum(query);
            res.status(200).json({
                statusCode: "200",
                message: "Relation to Beneficiary Added successfully",
                data
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },


    // Get RelationshipToBeneficiaryEnum By Id

    getRelationshipToBeneficiaryEnum: async (req, res) => {
        try {
            let data = await relationshipToBeneficiaryServices.getRelationshipToBeneficiaryEnum({ _id: req.params.id });
            res.status(200).json({
                statusCode: "200",
                message: "Success",
                data
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
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
            res.status(200).json({
                statusCode: "200",
                message: "Success",
                data: {
                    objectCount: objectArray.length,
                    objectArray
                }
            })
        } catch (err) {
            res.status(500).json({ message: err.message });
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
                return res.status(404).json({ error: "Record Not Found" });
              }
              res.status(200).json({
                statusCode: "200",
                message: "RelationToBeneficiaryEnum updated successfully",
                data
              });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = relationshipToBeneficiary;