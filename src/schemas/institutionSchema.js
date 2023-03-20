import mongoose from "mongoose";

const institutionSchema = mongoose.Schema(
  {
    // institutionId: {
    //   type: String,
    // },
    name: {
      type: String,
      required: [true, `please provide name`],
      unique: true,
    },
    cityHQ: { type: String, required: [true, `please provide cityHQ`] },

    employees: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "users",
    },
    // employeeCount: {
    //   type: Number,
    //   get: (v) => Math.round(v),
    //   set: (v) => Math.round(v),
    //   alias: "i",
    // },

    subscribers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "users",
    },
    institute_image: {
      type: String,
    },
    // subscriberCount: {
    //   type: Number,
    //   get: (v) => Math.round(v),
    //   set: (v) => Math.round(v),
    //   alias: "i",
    // },

    // benefitPolicy: {
    //   type: benefitPolicySchema,
    //   required: [false, `please provide valid family member `],
    // },

    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    // updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const institution = mongoose.model(`institutions`, institutionSchema);

// exporting institution collection
export default institution;
