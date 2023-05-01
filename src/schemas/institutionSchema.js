const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
    },
    phoneNumber: {
      type: String,
      required: [true, "please provide Phone Number"],
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cities",
      required: [true, "please provide city id"],
    },
    employeeCount: {
      type: String,
    },
    email: {
      type: String,
    },
    subscriberCount: {
      type: Number,
    },
    benefitPolicy: {
      insuranceType: {
        type: String,
        // required : [true, "Please provide insurance type"]
      },
      insuranceIssuer: {
        type: String,
        // required : [true, "Please provide insurance Issuer"]
      },
      balanceResetDate: {
        type: String,
        // required : [true, "Please provide balance Reset Date"]
      },
      policyExpirationDate: {
        type: String,
        // required: true,
        validate: {
          validator: function (v) {
            return /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/.test(v);
          },
          message: (props) =>
            "${props.value} is not a valid value for policyExpirationDate.",
        },
      },
      inPatientAggregateLimit: {
        type: Number,
        float: true,
        // required : [true, "Please provide inPatientAggregateLimit"]
      },
      inPatientServices: {
        type: [
          {
            service: {
              type: String,
              // required : [true, "Please provide type in Patient services"]
            },
          },
          {
            limit: {
              type: Number,
              float: true,
              // required : [true, "Please provide Limit in Patient services"]
            },
          },
        ],
        // required : [true, "Please provide insurance type"]
      },
      outPatientAggregateLimit: {
        type: Number,
        float: true,
        // required : [true, "Please provide out Patient Aggregate Limit"]
      },
      outPatientServices: {
        type: [
          {
            service: {
              type: String,
              // required : [true, "Please provide service in out Patient service"]
            },
          },
          {
            limit: {
              type: Number,
              float: true,
              // required : [true, "Please provide Limit in Patient services"]
            },
          },
        ],
        // required : [true, "Please provide insurance type"]
      },
    },
    fileLink: {
      type: Array,
      default: null,
    },
  },
  { timestamps: true },
);

institutionSchema.pre(["find", "findOne" , "save" , "findOneAndUpdate"], function (next) {
  this.populate("city", "-__v");
  next();
});

const institution = mongoose.model("institutions", institutionSchema);

// exporting institution collection
module.exports = institution;
