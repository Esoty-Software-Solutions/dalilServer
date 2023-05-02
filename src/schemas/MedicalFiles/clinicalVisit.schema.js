const mongoose = require("mongoose");
const moment = require("moment/moment");

const clinicalVisitsSchema = new mongoose.Schema({
        visitType: {
            type : String,
            default : null,
        },
        visitDate: {
            type: Date,
            set: (v) => Date(v),
            get: (v) => v.toISOString().split(`T`)[0],
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
clinicalVisitsSchema.post(["findOne" , "find" , "findOneAndUpdate"] , function (doc) {
    if(Array.isArray(doc)) {
      doc.forEach(document => {
        document.visitDate = moment(document.visitDate).format('YYYY-MM-DD')
      });
    }else if (doc) {
      doc.visitDate = moment(doc.visitDate).format('YYYY-MM-DD');
    }
  });
const clinicalVisit = mongoose.model("clinicalVisit" , clinicalVisitsSchema);

module.exports = clinicalVisit;