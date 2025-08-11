import { Request, Response } from "express";
import { BaseControllerService } from "./base.controller";
import { HttpStatusCode, ResponseStatus } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";
import { LanguageRepository } from "../repositories/language.repository";
import { LanguageService } from "../services/language.service";

// Initialize repository and service instances
const languageRepository = new LanguageRepository();
const languageService = new LanguageService(languageRepository);

export class LanguageController extends BaseControllerService {
  /*
      Pseudocode for create language
      START
        - accept name from body
        - generate slug from name before saving document
        - return Language created successfully
      END
   */
  createLanguage(req: Request, res: Response): void {
    const req_body = req.body;
    languageService
      .createLanguage(req_body)
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
      Pseudocode for get all languages
      START
        - accept name query params page, limit, search 
        - return all matching languages
      END
   */
  async getLanguages(req: any, res: Response): Promise<void> {
    const query = req.query;
    languageService
      .getLanguages(query)
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
      Pseudocode for get language by language_id
      START
        - accept language_id from parameter
        - return language details 
      END
   */
  async getLanguageById(req: any, res: Response): Promise<void> {
    const language_id: string = req.params.id;
    const match = { _id: new ObjectId(language_id), is_active: true };
    languageService
      .getLanguageById(match)
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
      Pseudocode for edit language
      START
        - accept name from body and id from params
        - fetch and update language data
        - return Language updated successfully
      END
   */
  editLanguage(req: Request, res: Response): void {
    const req_body = req.body;
    const language_id: string = req.params.id;

    const match = {
      _id: new ObjectId(language_id),
      is_active: true,
    };
    languageService
      .editLanguage(match, req_body)
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
      Pseudocode for delete languages
      START
        - accept id from params
        - fetch and update language data
        - return Language updated successfully
      END
   */
  async deleteLanguage(req: any, res: Response): Promise<void> {
    const language_id: string = req.params.id;
    const match = { _id: new ObjectId(language_id), is_active: true };
    languageService
      .deleteLanguage(match)
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

export const languageController = new LanguageController();
