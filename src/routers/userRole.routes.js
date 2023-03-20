import express from "express";
import {
  authentication,
  cookieVerification,
  isAdmin,
} from "../utilities/auth.js";
import {
  CreateUserRole,
  GetAllRoles,
} from "../controllers/userRoleController.js";
var router = express.Router();

router.post("", authentication, CreateUserRole);
router.get("", GetAllRoles);
export default router;
