const joi = require("joi");

exports.clinicalVisitValidator = joi.object({
    visitType : joi.string().allow("" , null),
    visitDate : joi.string().allow("" , null),
    centerName : joi.string().required(),
    doctorName : joi.string().required(),
    notes : joi.string().required(),
    files : joi.string().allow("" , null)
});

exports.getMedicalFilesValidator = joi.object({
    limit : joi.number().optional().allow(""),
    searchQuery : joi.string().optional().allow(""),
    skip : joi.number().optional().allow("" , 0)
})

exports.createMedicalFilesValidator = joi.object({
    title : joi.string().required(),
    notes : joi.string().optional().allow(""),
    file : joi.string().optional().allow("")
})

exports.createSurgeryHistoryFilesValidator = joi.object({
    title : joi.string().required(),
    surgeryDate : joi.string().pattern(new RegExp('([0-9]{4})-(?:[0-9]{2})-([0-9]{2})')).optional(),
    doctorName : joi.string().optional().allow("" , null),
    centerName : joi.string().optional().allow("" , null),
    notes : joi.string().optional().allow("" , null),
    file : joi.string().optional().allow("" , null)
})

exports.createChronicDiseasesFilesValidator = joi.object({
    title : joi.string().required(),
    diagnosisDate : joi.string().pattern(new RegExp('([0-9]{4})-(?:[0-9]{2})-([0-9]{2})')).optional(),
    doctorName : joi.string().optional().allow("" , null),
    notes : joi.string().optional().allow("" , null),
    file : joi.string().optional().allow("" , null)
});

exports.createMedicalTestsValidator = joi.object({
    title : joi.string().required(),
    reportDate : joi.string().pattern(new RegExp('([0-9]{4})-(?:[0-9]{2})-([0-9]{2})')).optional(),
    city : joi.string().optional().allow("" , null),
    centerName : joi.string().optional().allow("" , null),
    notes : joi.string().optional().allow("" , null),
    file : joi.string().optional().allow("" , null)
});