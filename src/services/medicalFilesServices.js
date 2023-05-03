const LIMIT = 30;
const SKIP = 0;
const _ = require("lodash");
const uploader = require("../utilities/uploader");
const config = require("../config/config");
const { beneficiaries } = require("../schemas/subscriberSchema");
const { getSearchQuery } = require("../utilities/searchQuery");
const chronicDiseases = require("../schemas/MedicalFiles/chronicDisease.schema");
const allergy = require("../schemas/MedicalFiles/allergy.schema");
const clinicalVisit = require("../schemas/MedicalFiles/clinicalVisit.schema");
const medicalTests = require("../schemas/MedicalFiles/medicalTests.schema");
const surgeryHistory = require("../schemas/MedicalFiles/surgeryHistory.schema");

// exports.createMedicalFile = async (query) => {
//   return await medicalFiles.create(query);
// };

// exports.updateMedicalFile = async (query, data) => {
//   return await medicalFiles.findByIdAndUpdate(query, data, { new: true });
// };

// exports.getMedicalFiles = async (filter) => {
//   return await medicalFiles.find(filter);
// };

exports.getMedicalFilesAggregator = async (schema, query, skip, limit) => {
  let objectCount = await schema.find(query).count();
  
  let documents = await schema
    .find(query)
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .lean();

  // iterating over the array to replace public url to presigned url..
  const objectArray = await Promise.all(
    documents.map(async (data) => {
      if (data?.fileLink) {
        const presignedUrl = await uploader.getPresignedUrl(
          data.fileLink,
          config.aws_bucketName
        );
        data.fileLink = presignedUrl;
      }
      if (!data?.thumbnailLink) {
        data.thumbnailLink = "https://cdn4.iconfinder.com/data/icons/document-71/24/13--512.png";
      }
      return data;
    })
  );
  return { objectArray, objectCount };
};

exports.getDataMedicalFiles = async (queryPayload, params ,schema) => {
  try {
    var findQuery = _.merge({} , params);
    const { limit, searchQuery, skip } = queryPayload;
    if(searchQuery) findQuery = getSearchQuery(["visitDate","visitType", "centerName","doctorName" , "notes","_id"], searchQuery);
    
    const allData = await this.getMedicalFilesAggregator(
      schema,
      findQuery,
      skip ? skip : SKIP,
      limit ? limit : LIMIT
    );
    // parsing the url in the get file to return the presigned url with expiry time instead of public url
      
    return {
      success: true,
      data: allData,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: error,
    };
  }
};

exports.createMedicalFiles = async (body, params, schema, fileData) => {
  const createdPayload = _.merge(body, params);
  let fileLinkAddedPayload;

  if(fileData) {
    const {location : fileLink} = fileData;
    fileLinkAddedPayload = _.assign(createdPayload , {fileLink : fileLink});
  }
  try {
    const createDocument = await schema.create(fileData ? fileLinkAddedPayload : createdPayload);
    if(fileData) {
       const presignedUrl = await uploader.getPresignedUrl(createDocument.fileLink , config.aws_bucketName);
      createDocument.fileLink = presignedUrl;
    }
    if(!createDocument) {
        return {
          success : false, 
          data : []
        }
    }else{
        return {
          success : true,
          data : createDocument
        }
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: error,
    };
  }
};


exports.createMedFileForSubscriber = async (query, body , param) => {
  let user;
  console.log(body);
  console.log(param);
  if(param === "create") {
    console.log(body);
   user = await beneficiaries.findOneAndUpdate(query , body , {new : true});
  }else if(param === "get"){
    user = await beneficiaries.findOne(query);
  }
  if(user) {
    return {
      _id : user._id,
      beneficiaryId : user?.beneficiaryId,
      weight : user?.medicalFiles?.weight,
      bloodType : user?.medicalFiles?.bloodType,
      height : user?.medicalFiles?.height,
    }
  }
  else{
    return {}
  }
};

exports.deleteMedicalFile = async (schema, query) => {

  console.log(schema, query);
  return await eval(schema).findOneAndDelete(query);
}
