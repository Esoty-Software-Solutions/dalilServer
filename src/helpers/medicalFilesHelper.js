const clinicalVisit = require("../schemas/MedicalFiles/clinicalVisit.schema")


exports.findClinicalDocuments = async (findQuery, skip, limit) => {
    console.log({
        findQuery, skip, limit
    })
    return new Promise((resolve, reject) => {
        clinicalVisit.aggregate([
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
