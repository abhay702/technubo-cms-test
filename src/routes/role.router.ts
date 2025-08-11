//express imports
import express from "express";
import { validateRequest } from "../middleware/validator.middleware";
import { roleController } from "../controllers/role.controller";
import { RoleEnumSlug } from "../enums/role.enum";
import { Authorized } from "../middleware/authenticate.middleware";
import { roleValidator } from "../validators/role.validate.";
export const roleRouter = express.Router();
// Set the common part of the path for the routes in this router
const base = "/role";

roleRouter.post(
  `${base}`,
  validateRequest(roleValidator),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    roleController.createRecord(req, res);
  }
);

roleRouter.get(`${base}/list`, (req, res) => {
  roleController.getRoles(req, res);
});

roleRouter.get(`${base}/:id`, (req, res) => {
  roleController.getRoleById(req, res);
});

roleRouter.delete(
  `${base}/:id`,
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    roleController.deleteRole(req, res);
  }
);
