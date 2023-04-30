// importing mongooose for pharmacy and collection setup
const mongoose = require(`mongoose`);

const pharmacySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `please enter valid  name`],
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cities",
      required: [true, `please enter valid city`],
    },
    description: { 
        type: String, 
        default: null 
    },
    address: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: [String],
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
      default : null,
    },
    fileLink: { 
      type: Array, 
      default: null 
    },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);
// this middleware will always return the city object and not the city objectId
pharmacySchema.pre(['find' , "findOne" , "save" , "findOneAndUpdate"], function(next) {
  this.populate('city' , '-__v');
  next();
});
const pharmacy = mongoose.model(`pharmacy`, pharmacySchema);

module.exports = pharmacy;
