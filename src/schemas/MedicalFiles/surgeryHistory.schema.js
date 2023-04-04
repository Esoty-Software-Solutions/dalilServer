const mongoose = require("mongoose");


const surgeryHistorySchema = new mongoose.Schema({
    medicalFileId: {
        type : String,
        default : null,
    },
    title: {
        type : String,
        required : true,
    },
    surgeryDate: {
        type : Date,
        default : null,
    },
    doctorName: {
        type : String,
        default : null,
    },
    centerName: {
        type : String,
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
    },
});

const surgeryHistory = mongoose.model("surgeryHistory" , surgeryHistorySchema);
module.exports = surgeryHistory;