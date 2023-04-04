const { serverErrorResponse, successResponse, badRequestErrorResponse } = require("../utilities/response");
const _ = require("lodash");
const clinicalVisit = require("../schemas/MedicalFiles/clinicalVisit.schema");
const { messageUtil } = require("../utilities/message");
const { findClinicalDocuments } = require("../helpers/medicalFilesHelper");
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
            
            const finalClinicalDocuments = await findClinicalDocuments(findClinicalVisitQuery,  skip ? skip : SKIP, limit ? limit : LIMIT)
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

        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createAllergiesController = async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getSurgeryHistoriesController = async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createSurgeryHistoriesController = async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getChronicDiseasesController = async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createChronicDiseasesController = async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getMedicalTestsController = async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createMedicalTestsController = async (req, res) => {
        try {

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