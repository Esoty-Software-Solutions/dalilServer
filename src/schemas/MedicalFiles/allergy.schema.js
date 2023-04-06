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
        default : "https://www.allergy.org.au/images/pcc/Clinical_History_Form.jpg",
    },
    fileLink: {
        type : String,
        default : "https://www.allergy.org.au/images/pcc/Clinical_History_Form.jpg",
    },
});

const allergy = mongoose.model("allergies" , allergySchema);

module.exports = allergy;