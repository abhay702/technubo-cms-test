import express from "express";
import { MenuTypeController } from "../controllers/menu_type.controller";
import { validateRequest } from "../middleware/validator.middleware";
import { menuTypeValidationSchema } from "../validators/menu_type.validate";
import { Authorized } from "../middleware/authenticate.middleware";
import { RoleEnumSlug } from "../enums/role.enum";
const menuTypeController = new MenuTypeController();

export const menuTypeRouter = express.Router();
// Set the common part of the path for the routes in this router
const base = "/menutype";

menuTypeRouter.post(
  `${base}`,
  validateRequest(menuTypeValidationSchema),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    menuTypeController.createMenuType(req, res);
  }
);

menuTypeRouter.get(`${base}`, (req, res) => {
  menuTypeController.getMenuTypes(req, res);
});

menuTypeRouter.get(`${base}/:id`, (req, res) => {
  menuTypeController.getMenuTypeById(req, res);
});

menuTypeRouter.put(
  `${base}/:id`,
  validateRequest(menuTypeValidationSchema),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    menuTypeController.updateMenuType(req, res);
  }
);
menuTypeRouter.delete(
  `${base}/:id`,
  validateRequest(menuTypeValidationSchema),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    menuTypeController.deleteMenuType(req, res);
  }
);
