const medicalSpecialtiesServices = require('../services/medicalSpecialtiesServices');
const {successResponse, badRequestErrorResponse, notFoundResponse, serverErrorResponse} = require('../utilities/response');



const medicalSpecialties = {

    // Add Medical Specialty

    addMedicalSpecialty: async (req, res) => {
        try {
            let query = {
                ...req.body,
            };
            let data = await medicalSpecialtiesServices.addMedicalSpecialty(query);

            return successResponse(res, "Medical Specialty Added successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get MedicalSpecialty By Id

    getMedicalSpecialty: async (req, res) => {
        try {
            let data = await medicalSpecialtiesServices.getMedicalSpecialty({ _id: req.params.id });
            if(!data) return notFoundResponse(res, "No Record Found")

            return successResponse(res, "Success", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },


    // Get list of MedicalSpecialties

    getAllMedicalSpecialties: async (req, res) => {
        try {
            let query = {
                limit: req.query.limit,
                skip: req.query.skip
            }
            let objectArray = await medicalSpecialtiesServices.getAllMedicalSpecialties(query);

            return successResponse(res, "Success", objectArray, objectArray.length);
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    },

    // Update MedicalSpecialty by Id

    updateMedicalSpecialty: async (req, res) => {
        try {
            let data = await medicalSpecialtiesServices.updateMedicalSpecialty(
                { _id: req.params.id },
                {...req.body}
            );

            if (!data) {
                return badRequestErrorResponse(res, "Record Not Found")
              }

              return successResponse(res, "Medical Specialty updated successfully", data)
        } catch (err) {
            return serverErrorResponse(res, err);
        }
    }
}

module.exports = medicalSpecialties;