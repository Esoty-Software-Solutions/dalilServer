const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.resolve(__dirname, `../../${process.env.NODE_ENV}.env`),
});
console.log("getting config file");
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.MONGOURI", process.env.jwtSecret, process.env.mongouri);
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  mongouri: process.env.mongouri,
  jwtSecret: process.env.jwtSecret,
  aws_bucketName : process.env.aws_bucketName,
  aws_accessKeyID : process.env.aws_accessKeyID,
  aws_secretAccessKey : process.env.aws_secretAccessKey,
  dalilStorage_bucket : process.env.dalilStorage_bucket
};
