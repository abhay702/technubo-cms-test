import { Request, Response } from "express";
import { RoleService } from "../services/role.service";
import { BaseControllerService } from "./base.controller";
import { HttpStatusCode, ResponseStatus } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";
import { RoleRepository } from "../repositories/role.repository";

// Initialize repository and service instances
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);

export class RoleController extends BaseControllerService {
  /*
      Pseudocode for create role
      START
        - accept name from body
        - generate slug from name before saving document
        - return Role created successfully
      END
   */
  createRecord(req: Request, res: Response): void {
    const req_body = req.body;
    roleService
      .createRecord(req_body)
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
  /*
      Pseudocode for get all roles
      START
        - accept name query params page, limit, search 
        - match with is_active true and search with name
        - return all matching roles
      END
   */
  async getRoles(req: any, res: Response): Promise<void> {
    const query = req.query;
    roleService
      .getRoles(query)
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
  /*
      Pseudocode for get role by role_id
      START
        - accept role_id from parameter
        - match is_active true and _id with role_id
        - return role details 
      END
   */
  async getRoleById(req: any, res: Response): Promise<void> {
    const roleId: string = req.params.id;
    const match = { _id: new ObjectId(roleId), is_active: true };
    roleService
      .getRoleById(match)
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
  /*
      Pseudocode for delete role
      START
        - accept id from params
        - match _id with role_id and is_active true
        - fetch and set is_active false
        - return Role deleted successfully
      END
   */
  async deleteRole(req: any, res: Response): Promise<void> {
    const roleId: string = req.params.id;
    const match = { _id: new ObjectId(roleId), is_active: true };
    roleService
      .deleteRole(match)
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

export const roleController = new RoleController();
