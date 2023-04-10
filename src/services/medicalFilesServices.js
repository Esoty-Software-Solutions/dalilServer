const LIMIT = 30;
const SKIP = 0;
const findQueryCommonUtil = require("../utilities/findQueryUtil");
const _ = require("lodash");
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
    .lean()
    

  return {documents, documentsCount};
};

exports.getDataMedicalFiles = async (queryPayload , schema) => {
  try{
    var findQuery = {};
    const {limit, searchQuery , skip} = queryPayload;
    
    if (searchQuery) {
      findQuery = findQueryCommonUtil(searchQuery , findQuery);
    }
  

    const allData = await this.getMedicalFilesAggregator(schema, findQuery, skip ? skip : SKIP , limit ? limit : LIMIT)
  
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

exports.createMedicalFiles = async (body, params, schema) => {
  const createdPayload = _.merge(body, params);
  try {
    const createDocument = await schema.create(createdPayload);
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
    return {
      success : false, 
      data : error
    } 
  }
}