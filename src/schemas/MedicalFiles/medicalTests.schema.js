const mongoose = require ("mongoose");

const medicalTestSchema = new mongoose.Schema({
    title: {
        type : String,
        default : null
    },
    centerName: {
        type : String,
        required : true,
    },
    city: {
        type : String,
        default : null,
    },
    reportDate: {
        type : Date,
        default : null,
    },
    notes: {
        type : String,
        default : null,
    },
    // hard coded for now
    thumbnailLink: {
        type : String,
        default : "https://www.allergy.org.au/images/pcc/Clinical_History_Form.jpg",
    },
    fileLink: {
        type : String,
        default : "https://www.allergy.org.au/images/pcc/Clinical_History_Form.jpg",
    }
});

const medicalTests = mongoose.model("medicalTests" , medicalTestSchema);
module.exports = medicalTests;