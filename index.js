const express = require("express");
var cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const routes = require("./src/routers/routes");
const dotenv = require(`dotenv`).config();
const config = require("./src/config/config");
const mongoose = require("mongoose");
// app.use(express.json({ urlencoded: true }));

// enable cors
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// this will set the getters to true for the entire project globally
mongoose.set('toJSON', { getters: true });

app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb" }));
const PORT = config.PORT || 3000;

/***Route binding*/
app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Hello from pirate studio Server, updated with github actions");
});
/*******MongoDB Connectivity */
const { connectDB } = require("./src/config/database");
connectDB();

app.listen(PORT, () => {
  console.log(`The project is running on PORT ${PORT}`);
});
