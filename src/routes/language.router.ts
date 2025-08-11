//express imports
import express from "express";
import { languageController } from "../controllers/language.controller";
import { validateRequest } from "../middleware/validator.middleware";
import { languageValidator } from "../validators/language.validate";
import { Authorized } from "../middleware/authenticate.middleware";
import { RoleEnumSlug } from "../enums/role.enum";
export const languageRouter = express.Router();
const base = "/language";

languageRouter.post(
  `${base}/`,
  validateRequest(languageValidator),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    languageController.createLanguage(req, res);
  }
);

languageRouter.get(`${base}/list`, (req, res) => {
  languageController.getLanguages(req, res);
});

languageRouter.put(
  `${base}/:id`,
  validateRequest(languageValidator),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    languageController.editLanguage(req, res);
  }
);

languageRouter.get(`${base}/detail/:id`, (req, res) => {
  languageController.getLanguageById(req, res);
});

languageRouter.delete(
  `${base}/:id`,
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    languageController.deleteLanguage(req, res);
  }
);
