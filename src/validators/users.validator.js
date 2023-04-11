const joi = require("joi");

exports.loginValidator = joi.object({
    user : joi.string().required(),
    password : joi.string().required(),
    deviceToken : joi.string().required(),
    deviceType : joi.string().valid("android" , "ios" , "browser")
})