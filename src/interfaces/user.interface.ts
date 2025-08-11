import { ObjectId } from "mongodb";
import { ResponseInterface } from "./response.interface";

export interface IUser {
  name: string;
  password: string;
  email: string;
  role_id: any;
  is_active?: boolean;
  extras?: object;
}

export interface UserWithToken {
  token: string;
  user: IUser;
}

export interface UserPost {
  data?: IUser; // Single user object
}

export interface IUserRepository {
  createRecord(data: object): Promise<IUser>;
  getExistRecord(match: object): Promise<IUser>;
  updateUser(match: object, data: object): Promise<IUser>;
  getUserList(match: object): Promise<IUser[] | null>;
  deleteUser(data: object): Promise<null>;
}
/**
 * GetAllUsersParams
 *
 * Interface for the parameters to retrieve all users with pagination, search, and sorting.
 */
export interface GetAllUsersParams {
  page: number; // Page number for pagination
  limit: number; // Number of items per page
  search: string; // Search query
  sort: string; // Sort field
  order: string; // Sort order (asc or desc)
}

export interface IUserService {
  userSignup(
    req_body: IUser
  ): Promise<ResponseInterface<{ token: string; user: IUser } | null>>;
  signIn(
    email: string,
    password: string
  ): Promise<ResponseInterface<string | null>>;
  updateUser(
    match: object,
    data: IUser
  ): Promise<ResponseInterface<IUser | null>>;
  deleteUser(user_id: string): Promise<ResponseInterface<null>>;
  getUsers(match: object): Promise<ResponseInterface<any>>;
  getMe(match: object): Promise<ResponseInterface<any>>;
}
