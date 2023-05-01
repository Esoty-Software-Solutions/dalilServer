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
        type: Date,
        set: (v) => Date(v),
        get: (v) => v.toISOString().split(`T`)[0],
        default : null,
    },
    notes: {
        type : String,
        default : null,
    },
    // hard coded for now
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

const medicalTests = mongoose.model("medicalTests" , medicalTestSchema);
module.exports = medicalTests;