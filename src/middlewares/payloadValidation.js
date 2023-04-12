const {
    badRequestErrorResponse
} = require("../utilities/response");

exports.customValidation = (joiValidator, payloadType) => {
    // payload type can be body or query as of now
    try{
        return (req, res, next) => {
            const payload = req[payloadType];
            const {error} = joiValidator.validate(payload);
            if (error) {
                badRequestErrorResponse(res, error.message.replaceAll('"', ""))
            } else {
                next();
            }
        }
    }catch(err) {
        return (req, res , next) => {
            console.log(err);
            badRequestErrorResponse(res, "Request body Not Valid");
        }
    }
}
