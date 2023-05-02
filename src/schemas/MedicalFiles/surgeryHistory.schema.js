const mongoose = require("mongoose");
const moment = require("moment/moment");

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
        type: Date,
        set: (v) => Date(v),
        get: (v) => v.toISOString().split(`T`)[0],
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
        default : null,
    },
    fileLink: {
        type : String,
        // hardcoded for now
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

surgeryHistorySchema.post(["findOne" , "find" , "findOneAndUpdate"] , function (doc) {
    if(Array.isArray(doc)) {
      doc.forEach(document => {
        document.surgeryDate = moment(document.surgeryDate).format('YYYY-MM-DD')
      });
    }else if (doc) {
      doc.surgeryDate = moment(doc.surgeryDate).format('YYYY-MM-DD');
    }
  });

const surgeryHistory = mongoose.model("surgeryHistory" , surgeryHistorySchema);
module.exports = surgeryHistory;