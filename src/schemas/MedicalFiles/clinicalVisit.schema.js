const mongoose = require("mongoose");

const clinicalVisitsSchema = new mongoose.Schema({
        visitType: {
            type : String,
            default : null,
        },
        visitDate: {
            type : Date,
            default : null,
        },
        centerName: {
            type : String,
            default : null,
            required : true
        },
        doctorName: {
            type : String,
            default : null,
            required : true
        },
        notes: {
            type : String,
            default : null,
            required : true
        },
        thumbnailLink: {
            type : String,
            default : null,
        },
        fileLink: {
            type : String,
            default : null,
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

const clinicalVisit = mongoose.model("clinicalVisit" , clinicalVisitsSchema);

module.exports = clinicalVisit;