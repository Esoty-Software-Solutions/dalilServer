const { ObjectId } = require('bson');


const searchQuery = (searchFields, searchQuery) => {
  return {
    $or: searchFields.map((field) => {
    
      const isValid = ObjectId.isValid(searchQuery);
      if(field !="_id")
      {
        return {
          [field]: {
            $regex: searchQuery,
            $options: "i", // Case-insensitive search
          }
         } 
      }
     else if(field == "_id" && isValid===true)
      {
        return {
          [field]: searchQuery,
         } 
      }
      else{
        return {

        }
      }
   
    }),
  };
};
const getSearchQuery = (searchFields , query, existingQuery) => {
 // search query 
  let filterQP = {}; // temporary
  const searchData = searchFields;
  let searchquery= searchQuery(searchData, query);
  filterQP = { ...filterQP, ...searchquery , ...existingQuery };
  filterQP['$or'] = filterQP['$or'].filter(obj => Object.keys(obj).length !== 0);
  console.log(filterQP)
  return filterQP;
}
//  searchquery

module.exports = {searchQuery , getSearchQuery};