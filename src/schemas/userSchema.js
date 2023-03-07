// importing mongoose dependency for user schema and model creation
const mongoose = require(`mongoose`);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, `please provide valid username`],
    unique: [true, "username already exist"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    set: () => new mongoose.Types.ObjectId(),
    // get: (v) => v.toISOString(),
    required: [true, `please provide valid userId`],
    default: new mongoose.Types.ObjectId(),
    unique: true,
  },
  password: {
    type: String,
    required: [true, `please provide valid password`],
  },
  phoneNumber: {
    type: String,
    required: [true, `please provide valid phoneNumber`],
  },
  phoneAuthenticated: { type: Boolean, default: false },
  whatsAppNumber: { type: String },
  gender: { type: String, enum: ["male", "female"] },
  birthdate: { type: String },
  firstName: {
    type: String,
    required: [true, `please enter valid first name`],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, `please enter valid last name`],
  },
  subscriberId: {
    type: mongoose.Schema.Types.ObjectId,
    set: (v) => mongoose.Types.ObjectId(v),
    unique: [true, "employee ID has to be unique"],
    ref: "subscribers",
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdTimeStamp: {
    type: Date,
    set: (v) => Date(v),
    get: (v) => v.toISOString(),
    default: new Date(),
  },

  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  updatedTimeStamp: {
    type: Date,
    set: (v) => Date(v),
    get: (v) => v.toISOString(),
  },
  userFile: {
    type: [String],
  },
  userRole: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "userRoles",
  },
});

const user = mongoose.model(`users`, userSchema);

/// exporting user model to usermiddleware for querying user collection
module.exports = user;
