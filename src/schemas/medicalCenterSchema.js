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
      type: String,
      default: null,
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
      default: null,
    },

    fileLink: { type: Array, default: null },
    isActive: { type: Boolean },
  },
  { timestamps: true }
  // { collection: 'medicalCenters' }
);

const medicalCenter = mongoose.model(`medicalCenters`, medicalCenterSchema);

module.exports = medicalCenter;
