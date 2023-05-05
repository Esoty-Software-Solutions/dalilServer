// importing mongoose dependency for user schema and model creation
const mongoose = require(`mongoose`);
const bcrypt = require("bcrypt");
const moment = require("moment/moment");

const RoleSchema = new mongoose.Schema({
    backendName: {
        type: String,
        required: [true, `Please enter valid  BackendName`],
      },
      arabicName: {
        type: String,
        required: [true, `Please enter valid  ArabicName`],
      },
      englishName: {
        type: String,
        required: [true, `Please enter valid  EnglishName`],
      },
 
  createdTimeStamp: {
    type: Date,
    set: (v) => new Date(v),
    get: (v) => v.toISOString().split(`T`)[0],
    default: new Date()
  },

  updatedTimeStamp: {
    type: Date,
    set: (v) => new Date(v),
    get: (v) => v.toISOString().split(`T`)[0],
    default: new Date()
  },
 
});


const roles = mongoose.model(`Role`, RoleSchema);

/// exporting user model to usermiddleware for querying user collection
module.exports = roles;
