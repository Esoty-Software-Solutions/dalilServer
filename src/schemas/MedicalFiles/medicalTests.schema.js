const mongoose = require ("mongoose");

const medicalTestSchema = new mongoose.Schema({
    title: {
        type : String,
        default : null
    },
    centerName: {
        type : String,
        default : null
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
        default : "https://cdn.iconscout.com/icon/free/png-512/document-957-452909.png?f=avif&w=256",
    },
    fileLink: {
        type : String,
        default : null,
    }
});

const medicalTests = mongoose.model("medicalTests" , medicalTestSchema);
module.exports = medicalTests;