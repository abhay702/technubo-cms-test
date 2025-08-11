import express from "express";
import { MenuController } from "../controllers/menu.controller";
import { validateRequest } from "../middleware/validator.middleware";
import { menuValidationSchema } from "../validators/menu.validate";
import { Authorized } from "../middleware/authenticate.middleware";
import { RoleEnumSlug } from "../enums/role.enum";
const menuController = new MenuController();

export const menuRouter = express.Router();
// Set the common part of the path for the routes in this router
const base = "/menu";

menuRouter.post(
  `${base}`,
  validateRequest(menuValidationSchema),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    menuController.createMenu(req, res);
  }
);

menuRouter.get(`${base}/page/:id`, (req, res) => {
  menuController.getMenus(req, res);
});

menuRouter.get(`${base}/:id`, (req, res) => {
  menuController.getMenuById(req, res);
});

menuRouter.put(
  `${base}/:id`,
  validateRequest(menuValidationSchema),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    menuController.updateMenu(req, res);
  }
);
menuRouter.delete(
  `${base}/:id`,
  validateRequest(menuValidationSchema),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    menuController.deleteMenu(req, res);
  }
);
