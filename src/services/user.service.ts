import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser, IUserRepository } from "../interfaces";
import { ResponseInterface } from "../interfaces/response.interface";
import { ResponseStatus, HttpStatusCode } from "../enums/http.status.code.enum";
import { auth } from "../utils/auth";
import { IUserService } from "../interfaces/user.interface";
const authToken = new auth();
import roleModel from "../models/role.model";
import { ObjectId } from "mongodb";

export class AuthService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository | any) {
    this.userRepository = userRepository;
  }

  async userSignup(
    req_body: IUser
  ): Promise<ResponseInterface<{ token: string; user: IUser } | null>> {
    const role: any = await roleModel.findById({
      _id: new ObjectId(req_body.role_id),
    });
    if (!role) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        response: {
          status: ResponseStatus.FAILURE,
          message: "Role not found",
          data: null,
        },
      };
    }

    const existingUser = await this.userRepository.getExistRecord({
      email: req_body.email,
      is_active: true,
    });

    if (existingUser) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        response: {
          status: ResponseStatus.FAILURE,
          message: "Email already exists",
          data: null,
        },
      };
    }

    req_body.password = await bcrypt.hash(req_body.password, 10);

    return this.userRepository
      .createRecord(req_body)
      .then((user_details: any) => {
        const token = authToken.getToken(user_details, role.slug);

        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Sing up successfully",
            data: {
              token: token,
              user: user_details,
            },
          },
        };
      })
      .catch((error) => ({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        response: {
          status: ResponseStatus.FAILURE,
          message: error.message,
          data: null,
        },
      }));
  }

  signIn(
    email: string,
    password: string
  ): Promise<ResponseInterface<string | null>> {
    const match = {
      email: email,
      is_active: true,
    };
    return this.userRepository
      .getExistRecord(match)
      .then(async (user_details: any) => {
        if (user_details) {
          const isEqual = await bcrypt.compare(password, user_details.password);
          if (isEqual) {
            const role: any = await roleModel.findById({
              _id: new ObjectId(String(user_details.role_id)),
            });
            const token = authToken.getToken(user_details, role.slug);
            return {
              statusCode: HttpStatusCode.OK,
              response: {
                status: ResponseStatus.SUCCESS,
                message: "Logged in successfully",
                data: token,
              },
            };
          } else {
            return {
              statusCode: HttpStatusCode.UNAUTHORIZED,
              response: {
                status: ResponseStatus.FAILURE,
                message: "Invalid credentials",
                data: null,
              },
            };
          }
        } else {
          return {
            statusCode: HttpStatusCode.NOT_FOUND,
            response: {
              status: ResponseStatus.FAILURE,
              message: "User not found",
              data: null,
            },
          };
        }
      })
      .catch((error) => ({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        response: {
          status: ResponseStatus.FAILURE,
          message: error.message,
          data: null,
        },
      }));
  }

  async updateUser(
    match: object,
    data: IUser
  ): Promise<ResponseInterface<IUser | null>> {
    return this.userRepository
      .updateUser(match, data)
      .then((userData) => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "User updated successfully",
          data: userData,
        },
      }))
      .catch((error) => ({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        response: {
          status: ResponseStatus.FAILURE,
          message: error.message,
          data: null,
        },
      }));
  }

  deleteUser(user_id: string): Promise<ResponseInterface<null>> {
    return this.userRepository
      .updateUser({ _id: new ObjectId(user_id) }, { is_active: false })
      .then(() => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "User deleted successfully",
          data: null,
        },
      }))
      .catch((error) => ({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        response: {
          status: ResponseStatus.FAILURE,
          message: error.message,
          data: null,
        },
      }));
  }

  getUsers(match: object): Promise<ResponseInterface<any>> {
    return this.userRepository
      .getUserList(match)
      .then(async (result) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Users fetched successfully",
            data: result,
          },
        };
      })
      .catch((error) => ({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        response: {
          status: ResponseStatus.FAILURE,
          message: error.message,
          data: null,
        },
      }));
  }

  getMe(match: object): Promise<ResponseInterface<any>> {
    return this.userRepository
      .getExistRecord(match)
      .then(async (result: any) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Users fetched successfully",
            data: result,
          },
        };
      })
      .catch((error) => ({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        response: {
          status: ResponseStatus.FAILURE,
          message: error.message,
          data: null,
        },
      }));
  }
}
