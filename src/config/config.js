import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

dotenv.config({
  path: path.resolve(__dirname, `../../${process.env.NODE_ENV}.env`),
});

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  mongouri: process.env.mongouri,
  jwtSecret: process.env.jwtSecret,
};
export default config;
