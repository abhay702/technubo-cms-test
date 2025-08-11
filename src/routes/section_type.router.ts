//express imports
import express from "express";
import { validateRequest } from "../middleware/validator.middleware";
import { RoleEnumSlug } from "../enums/role.enum";
import { Authorized } from "../middleware/authenticate.middleware";
import { sectionTypeValidator } from "../validators/section_type.validate";
import { sectionTypeController } from "../controllers/section_type.controller";
export const sectionTypeRouter = express.Router();
// Set the common part of the path for the routes in this router
const base = "/sectionType";

sectionTypeRouter.post(
  `${base}`,
  validateRequest(sectionTypeValidator),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    sectionTypeController.createSectionType(req, res);
  }
);

sectionTypeRouter.put(
  `${base}/:id`,
  validateRequest(sectionTypeValidator),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    sectionTypeController.editSectionType(req, res);
  }
);

sectionTypeRouter.get(`${base}/list`, (req, res) => {
  sectionTypeController.getSectionTypes(req, res);
});

sectionTypeRouter.get(`${base}/:id`, (req, res) => {
  sectionTypeController.getSectionTypeById(req, res);
});

sectionTypeRouter.delete(
  `${base}/:id`,
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    sectionTypeController.deleteSectionType(req, res);
  }
);
