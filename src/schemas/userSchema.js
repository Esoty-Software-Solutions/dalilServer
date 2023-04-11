// importing mongoose dependency for user schema and model creation
const mongoose = require(`mongoose`);
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
  secondName: { type: String },
  thirdName: { type: String },
  lastName: {
    type: String,
    required: [true, `please enter valid last name`],
  },
  email: { type: String },
  deviceToken: { type: String },
  deviceType: { type: String, enum: ["android", "ios", "browser"] },
  subscriberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subscribers",
    default: null,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctors",
    default: null,
  },
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "institutions",
    default: null,
  },
  resetPassword: { type: Boolean, default: false },
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
userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});
const user = mongoose.model(`users`, userSchema);

/// exporting user model to usermiddleware for querying user collection
module.exports = user;
