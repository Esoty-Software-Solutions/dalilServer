
exports.findDocuments = async (schema ,findQuery, skip, limit) => {
    return new Promise((resolve, reject) => {
        schema.aggregate([
            {
                "$match" : findQuery
            }, 
            { $skip: parseInt(skip) }, 
            { $limit: parseInt(limit) }

        ]).exec()
        .then(response=> {
            resolve(response);
        })
        .catch(err=> {
            reject ([]);
        })
    })
}
