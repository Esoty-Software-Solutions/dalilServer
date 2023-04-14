const {
    badRequestErrorResponse
} = require("../utilities/response");

exports.customValidation = (joiValidator, payloadType , isFile = false) => {
    // payload type can be body or query as of now
    try{
        return (req, res, next) => {
            const payload = req[payloadType];
            if(isFile) {
                if(!req.file) {
                    return badRequestErrorResponse(res, "Please provide file");
                }
            }
            const {error} = joiValidator.validate(payload);
            if (error) {
                return badRequestErrorResponse(res, error.message.replaceAll('"', ""))
            } else {
                next();
            }
        }
    }catch(err) {
        return (req, res , next) => {
            console.log(err);
            return badRequestErrorResponse(res, "Request body Not Valid");
        }
    }
}
