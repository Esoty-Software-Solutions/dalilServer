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
    thumbnailLink: {
        type : String,
        default : null,
    },
    fileLink: {
        type : String,
        default : null,
    }
});

const medicalTests = mongoose.model("medicalTests" , medicalTestSchema);
module.exports = medicalTests;