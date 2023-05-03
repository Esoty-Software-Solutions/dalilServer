const mongoose = require("mongoose");

const allergySchema = new mongoose.Schema({
    medicalFileId: {
        type : String,
        default : null,
    },
    title: {
        type : String,
        required : true,
    },
    notes: {
        type : String,
        default : null,
    },
    // for now thumbnail link is hard coded, once s3 logic is completed
    thumbnailLink: {
        type : String,
        default : null,
    },
    fileLink: {
        type : String,
        default : null,
    },
    beneficiaryId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "beneficiaries",
        required: [true, `please enter valid beneficiary id`],
    },
    subscriberId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subscribers",
        required: [true, `please enter valid subscribers id`],
    }
});


const allergy = mongoose.model("allergies" , allergySchema);

module.exports = allergy;