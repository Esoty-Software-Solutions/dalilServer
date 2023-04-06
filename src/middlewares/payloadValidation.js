const {
    badRequestErrorResponse
} = require("../utilities/response");

exports.customValidation = (joiValidator, payloadType) => {
    // payload type can be body or query as of now
    return (req, res, next) => {
        const payload = req[payloadType];
        console.log("this is the payload I am sending" , payload);
        const {error} = joiValidator.validate(payload);
        if (error) {
            badRequestErrorResponse(res, error.message.replaceAll('"', ""))
        } else {
            next();
        }
    }
}