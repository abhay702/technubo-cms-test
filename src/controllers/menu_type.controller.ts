import { Request, Response } from "express";
import { MenuTypeService } from "../services/menu_type.service";
import { BaseControllerService } from "./base.controller";
import { HttpStatusCode, ResponseStatus } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";
import { MenuTypeRepository } from "../repositories/menu_type.repository";

const menuTypeRepository = new MenuTypeRepository();
const menuTypeService = new MenuTypeService(menuTypeRepository);

export class MenuTypeController extends BaseControllerService {
  createMenuType(req: Request, res: Response): void {
    const req_body = req.body;
    menuTypeService
      .createMenuType(req_body)
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

  async getMenuTypes(req: any, res: Response): Promise<void> {
    const query = req.query;
    menuTypeService
      .getAllMenuTypes(query)
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

  async getMenuTypeById(req: any, res: Response): Promise<void> {
    const roleId: string = req.params.id;
    const match = { _id: new ObjectId(roleId), is_active: true };
    menuTypeService
      .getMenuTypeById(match)
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

  updateMenuType(req: Request, res: Response): void {
    const req_body = req.body;
    const Language_id: string = req.params.id;

    const match = {
      _id: new ObjectId(Language_id),
      is_active: true,
    };
    menuTypeService
      .editMenuType(match, req_body)
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

  async deleteMenuType(req: any, res: Response): Promise<void> {
    const roleId: string = req.params.id;
    const match = { _id: new ObjectId(roleId), is_active: true };
    menuTypeService
      .deleteMenuType(match)
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

export const menuTypeController = new MenuTypeController();
