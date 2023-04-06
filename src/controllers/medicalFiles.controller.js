const { serverErrorResponse, successResponse, badRequestErrorResponse, notFoundResponse } = require("../utilities/response");
const _ = require("lodash");
const clinicalVisit = require("../schemas/MedicalFiles/clinicalVisit.schema");
const { messageUtil } = require("../utilities/message");
const allergy = require("../schemas/MedicalFiles/allergy.schema");
const surgeryHistory = require("../schemas/MedicalFiles/surgeryHistory.schema");
const chronicDiseases = require("../schemas/MedicalFiles/chronicDisease.schema");
const medicalTests = require("../schemas/MedicalFiles/medicalTests.schema");
const medicalFilesServices = require("../services/medicalFilesServices"); 
/*

when we are creating a document in the model then we will extend the services created in medicalFiles services
when getting a document or multiple documents 
    ----- medicalFilesServices.getDataMedicalFiles
    expected payload of the service
    queryPayload {
        limit , searchQuery , skip
    }
    schema -- your desired mongoose schema
    
    expected output of the service
    output {
    count : totalRecords,
    data : finalClinicalDocuments
  }
when creating a single document
    ---- medicalFilesServices.createMedicalFiles
    expected input (body , params , schema)
    it will merge the first two objects which are body and params
    third arg is the mongoose schema
    
    expected output
        {
            success : boolean,
            data : array with length 
        }
*/

const initMedicalFilesController = () => {
    const getClinicalVisitsController = async (req, res) => {
        try {
            const queryPayload = req.query;
            const createResponse = await medicalFilesServices.getDataMedicalFiles(queryPayload , clinicalVisit);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);
            }else {
                return notFoundResponse(res , messageUtil.resourceNotFound)
            }
            
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createClinicalVisitsController = async (req, res) => {
        try {
            const createResponse = await medicalFilesServices.createMedicalFiles(req.body, req.params, clinicalVisit);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);

            }else {
                return badRequestErrorResponse(res , messageUtil.resourceNotCreated);
            }
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getAllergiesController = async (req, res) => {
        try {
            const queryPayload = req.query;
            const createResponse = await medicalFilesServices.getDataMedicalFiles(queryPayload, allergy);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);
            }else {
                return notFoundResponse(res , messageUtil.resourceNotFound)
            }
            
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createAllergiesController = async (req, res) => {
        try {
            const createResponse = await medicalFilesServices.createMedicalFiles(req.body, req.params, allergy);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);

            }else {
                return badRequestErrorResponse(res , messageUtil.resourceNotCreated);
            }
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getSurgeryHistoriesController = async (req, res) => {
        try {
            const queryPayload = req.query;
            const createResponse = await medicalFilesServices.getDataMedicalFiles(queryPayload , surgeryHistory);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);
            }else {
                return notFoundResponse(res , messageUtil.resourceNotFound)
            }
            
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createSurgeryHistoriesController = async (req, res) => {
        try {
            const createResponse = await medicalFilesServices.createMedicalFiles(req.body, req.params, surgeryHistory);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);

            }else {
                return badRequestErrorResponse(res , messageUtil.resourceNotCreated);
            }
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getChronicDiseasesController = async (req, res) => {
        try {
            const queryPayload = req.query;
            const createResponse = await medicalFilesServices.getDataMedicalFiles(queryPayload , chronicDiseases);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);
            }else {
                return notFoundResponse(res , messageUtil.resourceNotFound)
            }
            
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createChronicDiseasesController = async (req, res) => {
        try {
            const createResponse = await medicalFilesServices.createMedicalFiles(req.body, req.params, chronicDiseases);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);

            }else {
                return badRequestErrorResponse(res , messageUtil.resourceNotCreated);
            }
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getMedicalTestsController = async (req, res) => {
        try {
            const queryPayload = req.query;
            const createResponse = await medicalFilesServices.getDataMedicalFiles(queryPayload , medicalTests);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);
            }else {
                return notFoundResponse(res , messageUtil.resourceNotFound)
            }
            
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createMedicalTestsController = async (req, res) => {
        try {
            const createResponse = await medicalFilesServices.createMedicalFiles(req.body, req.params, medicalTests);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);

            }else {
                return badRequestErrorResponse(res , messageUtil.resourceNotCreated);
            }
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }

    return {
        getClinicalVisitsController,
        createClinicalVisitsController,
        getAllergiesController,
        createAllergiesController,
        getSurgeryHistoriesController,
        createSurgeryHistoriesController,
        getChronicDiseasesController,
        createChronicDiseasesController,
        getMedicalTestsController,
        createMedicalTestsController
    }
}

module.exports = initMedicalFilesController;