const searchQuery = (searchFields, searchQuery) => {
  return {
    $or: searchFields.map((field) => ({
      [field]: {
        $regex: searchQuery,
        $options: "i", // Case-insensitive search
      },
    })),
  };
};
const getSearchQuery = (searchFields , query, existingQuery) => {
 // search query 
  let filterQP = {}; // temporary
  const searchData = searchFields;
  let searchquery= searchQuery(searchData, query);
  filterQP = { ...filterQP, ...searchquery , ...existingQuery };
  return filterQP;
}
//  searchquery

module.exports = {searchQuery , getSearchQuery};