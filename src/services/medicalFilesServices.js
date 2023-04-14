const LIMIT = 30;
const SKIP = 0;
const findQueryCommonUtil = require("../utilities/findQueryUtil");
const _ = require("lodash");
const uploader = require("../utilities/uploader");
const config = require("../config/config");
// exports.createMedicalFile = async (query) => {
//   return await medicalFiles.create(query);
// };

// exports.updateMedicalFile = async (query, data) => {
//   return await medicalFiles.findByIdAndUpdate(query, data, { new: true });
// };

// exports.getMedicalFiles = async (filter) => {
//   return await medicalFiles.find(filter);
// };

exports.getMedicalFilesAggregator = async (schema , query, skip, limit) => {
  let documentsCount = await schema.find(query).count();
  let documents = await schema
    .find(query)
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .lean();

    // iterating over the array to replace public url to presigned url.. 
    const newDocuments = await Promise.all(documents.map(async (data)=>{
      if(data?.fileLink) {
        const presignedUrl = await uploader.getPresignedUrl(data.fileLink , config.aws_bucketName);
        data.fileLink = presignedUrl;
      }
      return data;
    }));
  return {newDocuments, documentsCount};
};

exports.getDataMedicalFiles = async (queryPayload , schema) => {
  try{
    var findQuery = {};
    const {limit, searchQuery , skip} = queryPayload;
    
    if (searchQuery) {
      findQuery = findQueryCommonUtil(searchQuery , findQuery);
    }
  
    const allData = await this.getMedicalFilesAggregator(schema, findQuery, skip ? skip : SKIP , limit ? limit : LIMIT)
    // parsing the url in the get file to return the presigned url with expiry time instead of public url

    return {
      success : true, 
      data : allData
    }
  }catch(error) {
    console.log(error);
    return {
      success : false, 
      data : error
    } 
  }
  
}

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
      success : false, 
      data : error
    } 
  }
}

