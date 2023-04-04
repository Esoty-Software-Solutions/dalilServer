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
    thumbnailLink: {
        type : String,
        default : null 
    },
    fileLink: {
        type : String,
        default : null 
    },
});

const chronicDiseases = mongoose.model("chronicDisease" , chronicDiseasesSchema);
module.exports = chronicDiseases;