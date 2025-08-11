//express imports
import express from "express";
import { validateRequest } from "../middleware/validator.middleware";
import { RoleEnumSlug } from "../enums/role.enum";
import { Authorized } from "../middleware/authenticate.middleware";
import { pageValidator } from "../validators/page.validate";
import { pageController } from "../controllers/page.controller";
export const pageRouter = express.Router();
// Set the common part of the path for the routes in this router
const base = "/page";

pageRouter.post(
  `${base}`,
  validateRequest(pageValidator.create),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    pageController.createPage(req, res);
  }
);

pageRouter.put(
  `${base}/:id`,
  validateRequest(pageValidator.create),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    pageController.editPage(req, res);
  }
);

pageRouter.get(`${base}/list`, (req, res) => {
  pageController.getPages(req, res);
});

pageRouter.get(`${base}/:id`, (req, res) => {
  pageController.getPageById(req, res);
});

pageRouter.delete(
  `${base}/:id`,
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    pageController.deletePage(req, res);
  }
);

pageRouter.put(
  `${base}/publishStatus/:id`,
  validateRequest(pageValidator.publishStatus),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    pageController.pagePublishStatus(req, res);
  }
);

pageRouter.get(`${base}/:locale/:slug`, (req, res) => {
  pageController.getPageBySlug(req, res);
});
