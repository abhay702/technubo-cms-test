import { Request, Response } from "express";
import { DirectoryService } from "../services/directory.service";
import { BaseControllerService } from "./base.controller";
import { HttpStatusCode, ResponseStatus } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";
import { DirectoryRepository } from "../repositories/directory.repository";

const directoryRepository = new DirectoryRepository();
const directoryService = new DirectoryService(directoryRepository);

export class DirectoryController extends BaseControllerService {
  createDirectory(req: Request, res: Response): void {
    const req_body = req.body;
    directoryService
      .createDirectory(req_body)
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

  async getDirectories(req: Request, res: Response): Promise<void> {
    const query = {
      ...req.query,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    };
    directoryService
      .getAllDirectories(query)
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

  async getDirectoryById(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const match = { _id: new ObjectId(id), is_active: true };
    directoryService
      .getDirectoryById(match)
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

  updateDirectory(req: Request, res: Response): void {
    const id: string = req.params.id;
    const match = { _id: new ObjectId(id), is_active: true };
    const req_body = req.body;

    directoryService
      .editDirectory(match, req_body)
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

  async deleteDirectory(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const match = { _id: new ObjectId(id), is_active: true };

    directoryService
      .deleteDirectory(match)
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
