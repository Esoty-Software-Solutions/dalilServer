const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.resolve(__dirname, `../../${process.env.NODE_ENV}.env`),
});
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.NODE_ENV", process.env.PORT);
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3800,
  mongouri: process.env.mongouri,
};
