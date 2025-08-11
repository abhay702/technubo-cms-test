//express imports
import express from "express";
import { validateRequest } from "../middleware/validator.middleware";
import { RoleEnumSlug } from "../enums/role.enum";
import { Authorized } from "../middleware/authenticate.middleware";
import { blogValidator } from "../validators/blogs.validate";
import { blogsController } from "../controllers/blogs.controller";
export const blogRouter = express.Router();
// Set the common part of the path for the routes in this router
const base = "/blogs";

blogRouter.post(
  `${base}`,
  validateRequest(blogValidator.create),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    blogsController.createBlog(req, res);
  }
);

blogRouter.put(
  `${base}/:id`,
  validateRequest(blogValidator.create),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    blogsController.editBlog(req, res);
  }
);

blogRouter.get(`${base}/list`, (req, res) => {
  blogsController.getBlogs(req, res);
});

blogRouter.get(`${base}/:id`, (req, res) => {
  blogsController.getBlogById(req, res);
});

blogRouter.delete(
  `${base}/:id`,
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    blogsController.deleteBlog(req, res);
  }
);

blogRouter.get(`${base}/:locale/:slug`, (req, res) => {
  blogsController.getBlogBySlug(req, res);
});
