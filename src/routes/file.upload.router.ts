//express imports
import express from "express";
import { fileUploadController } from "../controllers/file.upload.controller";
import { RoleEnumSlug } from "../enums/role.enum";
import { Authorized } from "../middleware/authenticate.middleware";
import { mUpload } from "../middleware/multer";
export const fileUploadRouter = express.Router();
const base = "/upload";

fileUploadRouter.post(
  `${base}/:prefix`,
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  mUpload,
  (req, res) => {
    fileUploadController.uploadFile(req, res);
  }
);
