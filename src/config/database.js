import mongoose from "mongoose";
import config from "./config.js";

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
export default connectDB;
