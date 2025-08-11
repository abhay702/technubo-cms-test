//express imports
import express from "express";
import { regionController } from "../controllers/region.controller";
import { validateRequest } from "../middleware/validator.middleware";
import { regionValidator } from "../validators/region.validate";
import { Authorized } from "../middleware/authenticate.middleware";
import { RoleEnumSlug } from "../enums/role.enum";
export const regionRouter = express.Router();
const base = "/region";

regionRouter.post(
  `${base}/`,
  validateRequest(regionValidator),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    regionController.createRegion(req, res);
  }
);

regionRouter.get(`${base}/list`, (req, res) => {
  regionController.getRegions(req, res);
});

regionRouter.put(
  `${base}/:id`,
  validateRequest(regionValidator),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    regionController.editRegion(req, res);
  }
);

regionRouter.get(`${base}/detail/:id`, (req, res) => {
  regionController.getRegionById(req, res);
});

regionRouter.delete(
  `${base}/:id`,
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    regionController.deleteRegion(req, res);
  }
);
