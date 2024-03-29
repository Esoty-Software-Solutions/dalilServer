const medicalServiceServices = require('../services/medicalServiceServices');
const MedicalServiceSchema = require('../schemas/medicalServicesSchema');
const {successResponse, badRequestErrorResponse, notFoundResponse, serverErrorResponse} = require('../utilities/response');
const { getSearchQuery } = require('../utilities/searchQuery');
const { messageUtil } = require("../utilities/message");
const Services = require("../services/commonServices");


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
            let filterQP = {}; // temporary
            if(req.query.searchQuery) filterQP = getSearchQuery(["backendName","arabicName", "englishName","_id"], req.query.searchQuery)
            let objectArray = await medicalServiceServices.getAllMedicalServices(filterQP , req.query.limit , req.query.skip);

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
    },
    deleteMedicalService: async (req, res) => {
        try {
          let body = {
            _id: req.params.id,
          };
    
          let data = await Services.deleteOne({
            schemaName: MedicalServiceSchema,
            body
           });
    
          if (!data) {
            return badRequestErrorResponse(res, messageUtil.resourceNotFound);
          }
    
          return successResponse(res, messageUtil.resourceDeleted, data);
        } catch (err) {
          return serverErrorResponse(res, err);
        }
      },
}

module.exports = medicalServices;