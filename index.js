import express from "express";
import cors from "cors";
const app = express();
import routes from "./src/routers/routes.js";
// const dotenv = require(`dotenv`).config();
import config from "./src/config/config.js";
import connectDB from "./src/config/database.js";
// app.use(express.json({ urlencoded: true }));

app.use(cors());

app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb" }));

const PORT = config.PORT || 3000;

/***Route binding*/
app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Hello from pirate studio Server");
});
/*******MongoDB Connectivity */
connectDB();

app.listen(PORT, () => {
  console.log(`The project is running on PORT ${PORT}`);
});
