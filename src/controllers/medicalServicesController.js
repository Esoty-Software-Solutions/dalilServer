const medicalServiceServices = require('../services/medicalServiceServices');
const {successResponse, badRequestErrorResponse, notFoundResponse, serverErrorResponse} = require('../utilities/response');



const medicalServices = {

    // Add Medical Service

    addMedicalService: async (req, res) => {
        try {
            let query = {
                ...req.body,
            };
            let data = await medicalServiceServices.addMedicalService(query);

            return successResponse(res, "Medical Service Added successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get MedicalService By Id

    getMedicalService: async (req, res) => {
        try {
            let data = await medicalServiceServices.getMedicalService({ _id: req.params.id });
            if(!data) return notFoundResponse(res, "No Record Found")
            return successResponse(res, "Success", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get list of MedicalServices

    getAllMedicalServices: async (req, res) => {
        try {
            // let query = {
            //     limit: req.query.limit,
            //     skip: req.query.skip
            // }
            let objectArray = await medicalServiceServices.getAllMedicalServices({} , req.query.limit , req.query.skip);

            return successResponse(res, "Success", {objectCount : objectArray.objectsCount , objectArray : objectArray.object});
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },

    // Update MedicalService by Id

    updateMedicalService: async (req, res) => {
        try {
            let data = await medicalServiceServices.updateMedicalService(
                { _id: req.params.id },
                {...req.body}
            );

            if (!data) {
                return badRequestErrorResponse(res, "Record Not Found")
              }

              return successResponse(res, "Medical Service updated successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    }
}

module.exports = medicalServices;