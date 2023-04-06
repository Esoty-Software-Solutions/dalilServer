const { serverErrorResponse, successResponse, badRequestErrorResponse } = require("../utilities/response");
const _ = require("lodash");
const clinicalVisit = require("../schemas/MedicalFiles/clinicalVisit.schema");
const { messageUtil } = require("../utilities/message");
const {  findDocuments } = require("../helpers/medicalFilesHelper");
const allergy = require("../schemas/MedicalFiles/allergy.schema");
const surgeryHistory = require("../schemas/MedicalFiles/surgeryHistory.schema");
const chronicDiseases = require("../schemas/MedicalFiles/chronicDisease.schema");
const medicalTests = require("../schemas/MedicalFiles/medicalTests.schema");
const LIMIT = 30;
const SKIP = 0;
const initMedicalFilesController = () => {
    const getClinicalVisitsController = async (req, res) => {
        try {
            let findClinicalVisitQuery = {};
            const {limit, searchQuery , skip} = req.query;
            
            if (searchQuery) {
                let searchKeyText = new RegExp(searchQuery, 'i');
                findClinicalVisitQuery['$or'] = [{name : searchKeyText}, {id : searchKeyText}]
            } 
            const totalRecords = await clinicalVisit.countDocuments(findClinicalVisitQuery);
            
            const finalClinicalDocuments = await findDocuments(clinicalVisit, findClinicalVisitQuery,  skip ? skip : SKIP, limit ? limit : LIMIT)
            return successResponse(res, messageUtil.resourceUpdated, {count : totalRecords , data : finalClinicalDocuments});
            
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createClinicalVisitsController = async (req, res) => {
        try {
            const createdPayload = _.merge(req.body, req.params);
            const createClinicalVisit = await clinicalVisit.create(createdPayload);
            if(!createClinicalVisit) {
                return badRequestErrorResponse(res, messageUtil.resourceNotFound);
            }
        return successResponse(res, messageUtil.resourceUpdated, createClinicalVisit);
            
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getAllergiesController = async (req, res) => {
        try {
            let findAllergyFilesQuery = {};
            const {limit, searchQuery , skip} = req.query;
            
            if (searchQuery) {
                let searchKeyText = new RegExp(searchQuery, 'i');
                findAllergyFilesQuery['$or'] = [{name : searchKeyText}, {id : searchKeyText}]
            } 
            const totalRecords = await allergy.countDocuments(findAllergyFilesQuery);
            
            const finalAllergyDocuments = await findDocuments(allergy, findAllergyFilesQuery,  skip ? skip : SKIP, limit ? limit : LIMIT)
            return successResponse(res, messageUtil.resourceUpdated, {count : totalRecords , data : finalAllergyDocuments});
            
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createAllergiesController = async (req, res) => {
        try {
            const payload = _.merge(req.body , req.params);
            // for now not using the data that is sent from the client because thumbnail link and file link are hardcoded in the database
            const createAllergyFile = await allergy.create(payload);
            if(!createAllergyFile) {
                return badRequestErrorResponse(res, messageUtil.resourceNotFound);
            }
            return successResponse(res, messageUtil.resourceUpdated, createAllergyFile);
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getSurgeryHistoriesController = async (req, res) => {
        try {
            let findSurgeryHistoriesQuery = {};
            const {limit, searchQuery , skip} = req.query;
            
            if (searchQuery) {
                let searchKeyText = new RegExp(searchQuery, 'i');
                findSurgeryHistoriesQuery['$or'] = [{name : searchKeyText}, {id : searchKeyText}]
            } 
            const totalRecords = await surgeryHistory.countDocuments(findSurgeryHistoriesQuery);
            
            const finalAllergyDocuments = await findDocuments(surgeryHistory, findSurgeryHistoriesQuery,  skip ? skip : SKIP, limit ? limit : LIMIT)
            return successResponse(res, messageUtil.resourceUpdated, {count : totalRecords , data : finalAllergyDocuments});
            
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createSurgeryHistoriesController = async (req, res) => {
        try {
            const payload = _.merge(req.body , req.params);
            // for now not using the data that is sent from the client because thumbnail link and file link are hardcoded in the database
            const createSurgeryFiles = await surgeryHistory.create(payload);
            if(!createSurgeryFiles) {
                return badRequestErrorResponse(res, messageUtil.resourceNotFound);
            }
            return successResponse(res, messageUtil.resourceUpdated, createSurgeryFiles);
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getChronicDiseasesController = async (req, res) => {
        try {
            let findChronicDiseasesFilesQuery = {};
            const {limit, searchQuery , skip} = req.query;
            
            if (searchQuery) {
                let searchKeyText = new RegExp(searchQuery, 'i');
                findChronicDiseasesFilesQuery['$or'] = [{name : searchKeyText}, {id : searchKeyText}]
            } 
            const totalRecords = await chronicDiseases.countDocuments(findChronicDiseasesFilesQuery);
            
            const finalChronicDiseasesDocuments = await findDocuments(chronicDiseases, findChronicDiseasesFilesQuery,  skip ? skip : SKIP, limit ? limit : LIMIT)
            return successResponse(res, messageUtil.resourceUpdated, {count : totalRecords , data : finalChronicDiseasesDocuments});
            
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createChronicDiseasesController = async (req, res) => {
        try {
            const payload = _.merge(req.body , req.params);
            // for now not using the data that is sent from the client because thumbnail link and file link are hardcoded in the database
            const createChronicDiseasesFiles = await chronicDiseases.create(payload);
            if(!createChronicDiseasesFiles) {
                return badRequestErrorResponse(res, messageUtil.resourceNotFound);
            }
            return successResponse(res, messageUtil.resourceUpdated, createChronicDiseasesFiles);
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getMedicalTestsController = async (req, res) => {
        try {
            let findMedicalTestsQuery = {};
            const {limit, searchQuery , skip} = req.query;
            
            if (searchQuery) {
                let searchKeyText = new RegExp(searchQuery, 'i');
                findMedicalTestsQuery['$or'] = [{name : searchKeyText}, {id : searchKeyText}]
            } 
            const totalRecords = await medicalTests.countDocuments(findMedicalTestsQuery);
            
            const finalMedicalTestsDocuments = await findDocuments(medicalTests, findMedicalTestsQuery,  skip ? skip : SKIP, limit ? limit : LIMIT)
            return successResponse(res, messageUtil.resourceUpdated, {count : totalRecords , data : finalMedicalTestsDocuments});
            
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createMedicalTestsController = async (req, res) => {
        try {
            const payload = _.merge(req.body , req.params);
            // for now not using the data that is sent from the client because thumbnail link and file link are hardcoded in the database
            const createMedicalTestsFiles = await medicalTests.create(payload);
            if(!createMedicalTestsFiles) {
                return badRequestErrorResponse(res, messageUtil.resourceNotFound);
            }
            return successResponse(res, messageUtil.resourceUpdated, createMedicalTestsFiles);
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