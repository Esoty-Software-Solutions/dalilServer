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
    thumbnailLink: {
        type : String,
        default : null,
    },
    fileLink: {
        type : String,
        default : null,
    },
});

const allergy = mongoose.model("allergies" , allergySchema);

module.exports = allergy;