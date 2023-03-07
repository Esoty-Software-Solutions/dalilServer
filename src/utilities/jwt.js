"use strict";
const jwt = require("jsonwebtoken");
const config = require("../config/config");
module.exports = {
  issue(payload, expiresIn) {
    // token will be issue with the given payload and expire time
    return jwt.sign(payload, config.jwtSecret, {
      //process.env.jwtSecret
      expiresIn: expiresIn ? expiresIn : "1d",
    });
  },
  verify(token) {
    try {
      return jwt.verify(token, config.jwtSecret); //
    } catch (err) {
      return false;
    }
  },
};
