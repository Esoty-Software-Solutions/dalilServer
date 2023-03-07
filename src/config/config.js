const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.resolve(__dirname, `../../${process.env.NODE_ENV}.env`),
});
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  mongouri: process.env.mongouri,
  jwtSecret: process.env.jwtSecret,
};
