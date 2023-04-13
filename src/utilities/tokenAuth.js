"use strict";
const jwtHelper = require("./jwt");

let checkToken = (req, res, next) => {
  console.log("checkToken");
  let token = req.header("Authorization"); // in header token will be send in "x-auth-token" variable/// changed to "Authorization" header
  console.log("🚀 ~ file: tokenAuth.js:6 ~ checkToken ~ token:", token);
  if (token) {
    const isVerified = jwtHelper.verify(token.split(` `)[1]);
    if (isVerified) {
      req.userId = isVerified.id;
      next();
    } else {
      return res.status(401).json({
        success: "false",
        message: "Authorization token is not valid",
      });
    }
  } else {
    return res.status(401).json({
      success: "false",
      message: "Authorization token is not provided",
      missingParameters: ["Authorization header"],
    });
  }
};

module.exports = {
  checkToken: checkToken,
};
