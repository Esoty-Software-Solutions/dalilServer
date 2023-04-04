const { serverErrorResponse, successResponse, badRequestErrorResponse } = require("../utilities/response");
const _ = require("lodash");
const clinicalVisit = require("../schemas/MedicalFiles/clinicalVisit.schema");
const { messageUtil } = require("../utilities/message");

const initMedicalFilesController = () => {
    const getClinicalVisitsController = async (req, res) => {
        try {
            
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