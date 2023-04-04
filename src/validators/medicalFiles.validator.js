const joi = require("joi");

exports.clinicalVisitValidator = joi.object({
    visitType : joi.string().allow("" , null),
    visitDate : joi.string().allow("" , null),
    centerName : joi.string().required(),
    doctorName : joi.string().required(),
    notes : joi.string().required(),
    files : joi.string().allow("" , null)
});