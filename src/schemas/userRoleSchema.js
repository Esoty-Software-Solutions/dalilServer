// importing mongoose for userRole schema and collection
import mongoose from "mongoose";

// userRole schema or structure
const userRoleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `please provide name`],
      unique: true,
    },

    // list the api endpoint this role should have access to
    apiPrivilages: {
      type: [String],
      required: true,
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
  // { collection: "userRoles" }
);

const userRole = mongoose.model("userRoles", userRoleSchema);

// exporting userRole collection
export default userRole;
