const Services = require("../services/commonServices");
const MedicalSpecialties = require("../schemas/medicalSpecialtiesSchema");
const {
  successResponse,
  badRequestErrorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../utilities/response");
const { getSearchQuery } = require("../utilities/searchQuery");

const { messageUtil } = require("../utilities/message");


const medicalSpecialties = {
  // Add Medical Specialty

  addMedicalSpecialty: async (req, res) => {
    try {
      let data = await Services.createOne({
        schemaName: MedicalSpecialties,
        body: req.body,
      });

      return successResponse(res, "Medical Specialty Added successfully", data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get MedicalSpecialty By Id

  getMedicalSpecialty: async (req, res) => {
    try {
      let body = {
        _id: req.params.id,
      };
      
      let data = await Services.getOne({
        schemaName: MedicalSpecialties,
        body,
      });
      if (!data) return notFoundResponse(res, "No Record Found");

      return successResponse(res, "Success", data);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Get list of MedicalSpecialties

  getAllMedicalSpecialties: async (req, res) => {
    try {
      let limit = req.query.limit;
      let skip = req.query.skip;
      let filterQP = {}; // temporary
      if(req.query.searchQuery) filterQP = getSearchQuery(["backendName","arabicName", "englishName", "_id"], req.query.searchQuery)
      let objectArray = await Services.getMany({
        schemaName: MedicalSpecialties,
        query : filterQP,
        limit : limit,
        skip : skip,
      });

      let objectCount = await Services.count({
        schemaName: MedicalSpecialties,
        query : filterQP
      });

      return successResponse(res, "Success", objectArray, objectCount);
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },

  // Update MedicalSpecialty by Id

  updateMedicalSpecialty: async (req, res) => {
    try {
      let query = { _id: req.params.id };
      let data = await Services.updateOne({
        schemaName: MedicalSpecialties,
        query,
        body: req.body,
      });

      if (!data) {
        return badRequestErrorResponse(res, "Record Not Found");
      }

      return successResponse(
        res,
        "Medical Specialty updated successfully",
        data
      );
    } catch (err) {
      return serverErrorResponse(res, err);
    }
  },
  deleteMedicalSpecialty: async (req, res) => {
    try {
      let body = {
        _id: req.params.id,
      };

      let data = await Services.deleteOne({
        schemaName: MedicalSpecialties,
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
};

module.exports = medicalSpecialties;
