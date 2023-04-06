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
        default : "https://www.allergy.org.au/images/pcc/Clinical_History_Form.jpg" 
    },
    fileLink: {
        type : String,
        default : "https://www.allergy.org.au/images/pcc/Clinical_History_Form.jpg" 
    },
});

const chronicDiseases = mongoose.model("chronicDisease" , chronicDiseasesSchema);
module.exports = chronicDiseases;