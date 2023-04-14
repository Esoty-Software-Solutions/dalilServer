const joi = require("joi")

exports.testNotificationValidator = joi.object({
    deviceToken : joi.string().required(),
    deviceType : joi.string().required(),
    payload : joi.object({
        title : joi.string().required(),
        body : joi.string().required(),
        clickAction : joi.string().optional(),
        iconURL : joi.string().optional(),
        data : joi.any().optional()
    }).required()
})