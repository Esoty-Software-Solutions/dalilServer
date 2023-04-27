const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    console.log("serverConfig.mongouri", config.mongouri);
    await mongoose.connect(config.mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error.message);
  }
};


const dropDB = async () => {
  try {
    console.log("serverConfig.mongouri", config.mongouri);
    await mongoose.connection.db.dropDatabase();
    console.log("Database is dropped", mongoose.connection.db.databaseName);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { connectDB, dropDB };
