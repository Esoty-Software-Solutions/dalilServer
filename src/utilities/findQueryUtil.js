
const findQueryCommonUtil = (searchQuery , findQuery) => {
    let searchKeyText = new RegExp(searchQuery, 'i');
    findQuery['$or'] = [{name : searchKeyText}, {id : searchKeyText}];
    return findQuery;
}

module.exports = findQueryCommonUtil;