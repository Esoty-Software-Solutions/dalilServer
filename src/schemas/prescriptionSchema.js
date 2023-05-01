// importing mongooose for prescriptionCenterSchema and collection setup
const mongoose = require(`mongoose`);


// Define the Quote schema
const quoteSchema = new mongoose.Schema({
    pharmacyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "pharmacy",
      required: [true, 'Please enter pharmacy id'],
    },
    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "prescriptions",
      required: [true, 'Please enter prescription id'],
    },
    notes: {
      type: String,
      default: null,
    },
    totalPrice: {
      type: Number,
    },
    table: {
      type: [
        {
          name: {
            type: String,
          },
        },
        {
          price: {
            type: Number,
          },
        },
      ],
    },
});


// prescriptionCenter schema setup
const prescriptionCenterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `please enter title`],
    },
    subscriberId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subscribers",
        required: [true, `please enter subscriber id`],
    },
    notes: {
     type : String,
     default : null
    },
    thumbnailLink: {
        type: String,
        default : "https://cdn.iconscout.com/icon/free/png-512/document-957-452909.png?f=avif&w=256",
      },
    fileLink: { 
        type: Array, 
        default: null 
    },
    Quotes : {
        type : [quoteSchema]
    },
    isActive: { 
        type: Boolean
     },
    },
  { timestamps: true }
);

const quota = mongoose.model("quota" , quoteSchema);
const prescriptionCenter = mongoose.model(`prescriptions`, prescriptionCenterSchema);

module.exports = prescriptionCenter;
