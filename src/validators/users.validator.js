const joi = require("joi");

exports.loginValidator = joi.object({
    username : joi.string().required(),
    password : joi.string().required(),
    deviceToken : joi.string().optional(),
    deviceType : joi.string().optional().valid("android" , "ios" , "browser")
})