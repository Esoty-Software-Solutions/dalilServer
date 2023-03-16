// importing mongooose for medicalCenterSchema and collection setup
const mongoose = require(`mongoose`);
const AutoIncrement = require("mongoose-sequence")(mongoose);

// medicalCenter schema setup
const medicalCenterSchema = mongoose.Schema(
  {
    medicalCenterId: { type: String },
    // medicalCenterId: { type: Number },
    name: {
      type: String,
      required: [true, `please enter valid  name`],
    },
    city: {
      type: String,
      required: [true, `please enter valid city`],
    },
    district: {
      type: String,
      required: [true, `please enter valid district`],
    },
    description: String,
    address: {
      type: String,
      required: [true, `please enter valid address`],
    },
    phoneNumber: {
      type: Array,
      required: [true, `please enter valid phoneNumbers`],
    },
    email: {
      type: String,
      // unique: true,
    },
    facebookLink: { type: String },
    googleMapLink: { type: String },
    website: {
      type: String,
      // required: [true, `please enter valid website`],
    },
    // creation: {
    //   createdBy: {type: String},
    //   dateCreated: {type: Date},
    // },

    fieldNames: { type: Array },
    originalNames: { type: Array },
    isActive: { type: Boolean },
    // created: {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    //   dateCreated: { type: Date},
    // },
    // updated: {
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    //   dateUpdated: { type: Date},
    // }
  },
  { timestamps: true }
  // { collection: 'medicalCenters' }
);
// medicalCenterSchema.plugin(AutoIncrement, {
//   id: "medicalCenterId",
//   inc_field: "medicalCenterId",
//   start_seq: "1000000",
//   inc_amount: 1,
// });
const medicalCenter = mongoose.model(`medicalCenters`, medicalCenterSchema);

module.exports = medicalCenter;
