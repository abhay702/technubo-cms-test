import { Request, Response } from "express";
import { AuthService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import { BaseControllerService } from "./base.controller";
import { HttpStatusCode, ResponseStatus } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";

// Initialize repository and service instances
const userRepository = new UserRepository();
const userAuthService = new AuthService(userRepository);

export class UserController extends BaseControllerService {
  registerUser(req: Request, res: Response): void {
    const req_body = req.body;
    userAuthService
      .userSignup(req_body)
      .then((result) => {
        super.handleResponse({ res, response: result });
      })
      .catch((error) => {
        super.handleResponse({
          res,
          response: {
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            response: {
              status: ResponseStatus.FAILURE,
              message: error.message || "An unexpected error occurred",
              data: null,
            },
          },
        });
      });
  }

  async signIn(req: any, res: Response): Promise<void> {
    const { email, password } = req.body;

    userAuthService
      .signIn(email, password)
      .then((result) => {
        super.handleResponse({ res, response: result });
      })
      .catch((error) => {
        super.handleResponse({
          res,
          response: {
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            response: {
              status: ResponseStatus.FAILURE,
              message: error.message || "An unexpected error occurred",
              data: null,
            },
          },
        });
      });
  }

  updateUser(req: any, res: Response): void {
    let userId = req.params.id;
    const updateData = req.body;
    const match = { _id: new ObjectId(userId), is_active: true };
    userAuthService
      .updateUser(match, updateData)
      .then((result) => {
        super.handleResponse({ res, response: result });
      })
      .catch((error) => {
        super.handleResponse({
          res,
          response: {
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            response: {
              status: ResponseStatus.FAILURE,
              message: error.message || "An unexpected error occurred",
              data: null,
            },
          },
        });
      });
  }

  async getUsers(req: any, res: Response): Promise<void> {
    const user = req.user;
    const match = { user, query: req.query };
    userAuthService
      .getUsers(match)
      .then((result) => {
        super.handleResponse({ res, response: result });
      })
      .catch((error) => {
        super.handleResponse({
          res,
          response: {
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            response: {
              status: ResponseStatus.FAILURE,
              message: error.message || "An unexpected error occurred",
              data: null,
            },
          },
        });
      });
  }

  async getMe(req: any, res: Response): Promise<void> {
    console.log(req.role);
    const userId: string = req._id;
    const match = { _id: new ObjectId(userId) };
    userAuthService
      .getMe(match)
      .then((result) => {
        super.handleResponse({ res, response: result });
      })
      .catch((error) => {
        super.handleResponse({
          res,
          response: {
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            response: {
              status: ResponseStatus.FAILURE,
              message: error.message || "An unexpected error occurred",
              data: null,
            },
          },
        });
      });
  }
}

export const userController = new UserController();
