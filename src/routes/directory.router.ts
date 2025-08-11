import express from "express";
import { DirectoryController } from "../controllers/directory.controller";
import { validateRequest } from "../middleware/validator.middleware";
import { directoryValidationSchema } from "../validators/directory.validate";
import { Authorized } from "../middleware/authenticate.middleware";
import { RoleEnumSlug } from "../enums/role.enum";

const directoryController = new DirectoryController();
export const directoryRouter = express.Router();
const base = "/directory";

directoryRouter.post(
  `${base}`,
  validateRequest(directoryValidationSchema),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    directoryController.createDirectory(req, res);
  }
);

directoryRouter.get(`${base}`, (req, res) => {
  directoryController.getDirectories(req, res);
});

directoryRouter.get(`${base}/:id`, (req, res) => {
  directoryController.getDirectoryById(req, res);
});

directoryRouter.put(
  `${base}/:id`,
  validateRequest(directoryValidationSchema),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    directoryController.updateDirectory(req, res);
  }
);

directoryRouter.delete(
  `${base}/:id`,
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    directoryController.deleteDirectory(req, res);
  }
);
