//express imports
import express from "express";
import { userController } from "../controllers/user.controller";
import { validateRequest } from "../middleware/validator.middleware";
import { userValidator } from "../validators/user.validate";
import { Authorized } from "../middleware/authenticate.middleware";
import { RoleEnumSlug } from "../enums/role.enum";
export const userRouter = express.Router();
// Set the common part of the path for the routes in this router
const base = "/user";

userRouter.post(
  `${base}/signup`,
  validateRequest(userValidator.signUp),
  (req, res) => {
    userController.registerUser(req, res);
  }
);

userRouter.post(`${base}/signin`, (req, res) => {
  userController.signIn(req, res);
});

userRouter.get(`${base}/me`, (req, res) => {
  userController.getMe(req, res);
});

userRouter.get(`${base}/list`, (req, res) => {
  userController.getUsers(req, res);
});

userRouter.put(
  `${base}/:id`,
  validateRequest(userValidator.editUser),
  Authorized([RoleEnumSlug.SUPER_ADMIN_SLUG, RoleEnumSlug.ADMIN_SLUG]),
  (req, res) => {
    userController.updateUser(req, res);
  }
);
