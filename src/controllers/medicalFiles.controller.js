const {
    serverErrorResponse,
    successResponse,
    badRequestErrorResponse,
    notFoundResponse
} = require("../utilities/response");
const _ = require("lodash");
const clinicalVisit = require("../schemas/MedicalFiles/clinicalVisit.schema");
const {
    messageUtil
} = require("../utilities/message");
const allergy = require("../schemas/MedicalFiles/allergy.schema");
const surgeryHistory = require("../schemas/MedicalFiles/surgeryHistory.schema");
const chronicDiseases = require("../schemas/MedicalFiles/chronicDisease.schema");
const medicalTests = require("../schemas/MedicalFiles/medicalTests.schema");
const medicalFilesServices = require("../services/medicalFilesServices");
const parseCSVToJSON = require("../utilities/CSVParser");
const { subscribers } = require("../schemas/subscriberSchema");
const { validationErrorResponse } = require("../utilities/response");
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
// --------------------------------------------------------------------------------------- MULTER FILE STRUCTURING ===================

 /*
            it returns an object with the below details
            req.file
                    {
                    fieldname: 'myFile',
                    originalname: 'Clinical_History_Form.jpg',
                    encoding: '7bit',
                    mimetype: 'image/jpeg',
                    destination: 'uploads/',
                    filename: '80f2e7b5850e92e3df01136eb96af7a2',
                    path: 'uploads\\80f2e7b5850e92e3df01136eb96af7a2',
                    size: 87462
                    }


                    and once the file is uploaded to the s3 bucket in that case the the returned object will be 
                            {
                            fieldname: 'myFile',
                            originalname: 'Clinical_History_Form.jpg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            size: 87462,
                            bucket: 'medical-files-esoty',
                            key: '1680855647000-Clinical_History_Form.jpg',
                            acl: 'private',
                            contentType: 'application/octet-stream',
                            contentDisposition: null,
                            storageClass: 'STANDARD',
                            serverSideEncryption: null,
                            metadata: { fieldName: 'myFile' },
                            location: 'https://medical-files-esoty.s3.amazonaws.com/1680855647000-Clinical_History_Form.jpg',
                            etag: '"7deed582215caa47cf0a4f2f4f5fe9ff"',
                            versionId: undefined
                            }
        
                    
                    */
// --------------------------------------------------------------------------------------- MULTER FILE STRUCTURING ===================

const initMedicalFilesController = () => {
    const getClinicalVisitsController = async (req, res) => {
        try {
            const queryPayload = req.query;
            const createResponse = await medicalFilesServices.getDataMedicalFiles(queryPayload, req.params, clinicalVisit);
            if (createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);
            } else {
                return notFoundResponse(res, messageUtil.resourceNotFound)
            }

        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createClinicalVisitsController = async (req, res) => {
        try {
            const createResponse = await medicalFilesServices.createMedicalFiles(req.body, req.params, clinicalVisit, req.file);
            if (createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);

            } else {
                return badRequestErrorResponse(res, messageUtil.resourceNotCreated);
            }
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getAllergiesController = async (req, res) => {
        try {
            const queryPayload = req.query;

            const createResponse = await medicalFilesServices.getDataMedicalFiles(queryPayload,req.params, allergy);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);
            } else {
                return notFoundResponse(res, messageUtil.resourceNotFound)
            }

        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createAllergiesController = async (req, res) => {
        try {
            const createResponse = await medicalFilesServices.createMedicalFiles(req.body, req.params, allergy, req.file);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);

            } else {
                return badRequestErrorResponse(res, messageUtil.resourceNotCreated);
            }
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getSurgeryHistoriesController = async (req, res) => {
        try {
            const queryPayload = req.query;
            const createResponse = await medicalFilesServices.getDataMedicalFiles(queryPayload, req.params, surgeryHistory);
            if (createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);
            } else {
                return notFoundResponse(res, messageUtil.resourceNotFound)
            }

        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createSurgeryHistoriesController = async (req, res) => {
        try {
            const createResponse = await medicalFilesServices.createMedicalFiles(req.body, req.params, surgeryHistory, req.file);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);

            } else {
                return badRequestErrorResponse(res, messageUtil.resourceNotCreated);
            }
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getChronicDiseasesController = async (req, res) => {
        try {
            const queryPayload = req.query;
            const createResponse = await medicalFilesServices.getDataMedicalFiles(queryPayload,req.params, chronicDiseases);
            if (createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);
            } else {
                return notFoundResponse(res, messageUtil.resourceNotFound)
            }

        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const createChronicDiseasesController = async (req, res) => {
        try {
            const createResponse = await medicalFilesServices.createMedicalFiles(req.body, req.params, chronicDiseases, req.file);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);

            } else {
                return badRequestErrorResponse(res, messageUtil.resourceNotCreated);
            }
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    
    const getMedicalTestsController = async (req, res) => {
        try {
            const queryPayload = req.query;
            const createResponse = await medicalFilesServices.getDataMedicalFiles(queryPayload , req.params , medicalTests);
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
            const createResponse = await medicalFilesServices.createMedicalFiles(req.body, req.params, medicalTests , req.file);
            if(createResponse?.success) {
                return successResponse(res, messageUtil.resourceUpdated, createResponse.data);

            } else {
                return badRequestErrorResponse(res, messageUtil.resourceNotCreated);
            }
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    
    const updateMedicalFileController = async (req, res) => {
        try {
            const query = {_id : req.params.beneficiaryId}
            const createResponse = await medicalFilesServices.createMedFileForSubscriber(query , {medicalFiles : req.body} , "create");
            return successResponse(res, messageUtil.resourceUpdated , createResponse)
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const getMedicalFilesController = async (req , res) => {
        try {
            const query = {_id : req.params.beneficiaryId}
            const getResponse = await medicalFilesServices.createMedFileForSubscriber(query , {} , "get");
            return successResponse(res, messageUtil.resourceFound , getResponse);
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    }
    const csvParseController = async (req, res) => {
        try {
            const csvBuffer = req.file.buffer; // assuming the CSV data is in a file upload field
                parseCSVToJSON(csvBuffer)
                .then(async(json) => {
                    // will add the json value to mongodb 
                    const addData = await subscribers.insertMany(json);
                    if(addData) {
                        return successResponse(res, messageUtil.resourceCreated);
                    }else{
                        return validationErrorResponse(res , "Data not added");
                    }
                })
                .catch((error) => {
                    return validationErrorResponse(res , "Provide a valid csv file");
                });
            
              
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res , error.message);
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
        createMedicalTestsController,
        updateMedicalFileController,
        getMedicalFilesController,
        csvParseController
    }
}

module.exports = initMedicalFilesController;