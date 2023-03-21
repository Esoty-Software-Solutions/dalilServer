import express from "express";
import { login } from "../controllers/userController.js";
var router = express.Router();

router.post("", login);

export default router;
