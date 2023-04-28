const mongoose = require("mongoose");

const chronicDiseasesSchema = new mongoose.Schema({
    medicalFileId: {
        type : String, 
        default : null,
    },
    title: {
        type : String, 
        required : true,
    },
    diagnosisDate: {
        type : Date,
        default : null, 
    },
    doctorName: {
        type : String,
        default : null 
    },
    notes: {
        type : String,
        default : null 
    },
    // hardcoded default value for now
    thumbnailLink: {
        type : String,
        default : null,
    },
    fileLink: {
        type : String,
        default : null 
    },
    beneficiaryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "beneficiaries",
        required : [true , "Please provide valid beneficiary" ]
    },
    subscriberId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subscribers",
        required : [true , "Please provide valid Subscriber" ]
    }
});

const chronicDiseases = mongoose.model("chronicDisease" , chronicDiseasesSchema);
module.exports = chronicDiseases;