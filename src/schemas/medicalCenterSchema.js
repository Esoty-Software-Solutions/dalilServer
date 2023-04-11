// importing mongooose for medicalCenterSchema and collection setup
const mongoose = require(`mongoose`);

// medicalCenter schema setup
const medicalCenterSchema = mongoose.Schema(
  {
    // medicalCenterId: { type: mongoose.ObjectId, unique: true },
    name: {
      type: String,
      required: [true, `please enter valid  name`],
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      set: (v) => mongoose.Types.ObjectId(v),
      ref: "city",
      required: [true, `please enter valid city`],
    },
    district: {
      type: String,
      default: null,
    },
    description: { type: String, default: null },
    address: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: Array,
      required: [true, `please enter valid phoneNumbers`],
    },
    email: {
      type: String,
      default: null,
    },
    facebookLink: { type: String, default: null },
    googleMapLink: { type: String, default: null },
    website: {
      type: String,
      default: null,
    },
    thumbnailLink: {
      type: String,
      default : "https://cdn.iconscout.com/icon/free/png-512/document-957-452909.png?f=avif&w=256",
    },

    fileLink: { type: Array, default: null },
    isActive: { type: Boolean },
  },
  { timestamps: true }
  // { collection: 'medicalCenters' }
);

const medicalCenter = mongoose.model(`medicalCenters`, medicalCenterSchema);

module.exports = medicalCenter;
