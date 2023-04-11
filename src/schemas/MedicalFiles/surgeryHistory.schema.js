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
        // hardcoded for now
        default : "https://cdn.iconscout.com/icon/free/png-512/document-957-452909.png?f=avif&w=256",
    },
    fileLink: {
        type : String,
        // hardcoded for now
        default : "https://www.allergy.org.au/images/pcc/Clinical_History_Form.jpg",
    },
});

const surgeryHistory = mongoose.model("surgeryHistory" , surgeryHistorySchema);
module.exports = surgeryHistory;