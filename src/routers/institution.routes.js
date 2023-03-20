import express from "express";
import {
  AddInstitution,
  UpdateInstitution,
  DeleteInstitution,
  InstitutionById,
  AllInstitutions,
} from "../controllers/institutionController.js";
import { authentication } from "../utilities/auth.js";
var router = express.Router();

router.post("", authentication, AddInstitution);
router.patch("/:institutionId", authentication, UpdateInstitution);
router.get("", AllInstitutions);
router.get("/:id", authentication, InstitutionById);
router.delete("/:id", authentication, DeleteInstitution);
export default router;
