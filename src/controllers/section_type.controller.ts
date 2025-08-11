import { Request, Response } from "express";
import { BaseControllerService } from "./base.controller";
import { HttpStatusCode, ResponseStatus } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";
import { SectionTypeRepository } from "../repositories/section_type.repository";
import { SectionTypeService } from "../services/section_type.service";

// Initialize repository and service instances
const sectionTypeRepository = new SectionTypeRepository();
const sectionTypeService = new SectionTypeService(sectionTypeRepository);

export class SectionTypeController extends BaseControllerService {
  /*
      Pseudocode for create region
      START
        - accept name from body
        - return Section type created successfully
      END
   */
  createSectionType(req: Request, res: Response): void {
    const req_body = req.body;
    sectionTypeService
      .createSectionType(req_body)
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
      Pseudocode for get all section types
      START
        - accept name query params page, limit, search 
        - match with is_active true 
        - return all matching section types
      END
   */
  async getSectionTypes(req: any, res: Response): Promise<void> {
    const query = req.query;
    sectionTypeService
      .getSectionTypes(query)
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
      Pseudocode for get section types by id
      START
        - accept id from parameter
        - match _id with id and is_active true
        - return section types details 
      END
   */
  async getSectionTypeById(req: any, res: Response): Promise<void> {
    const roleId: string = req.params.id;
    const match = { _id: new ObjectId(roleId), is_active: true };
    sectionTypeService
      .getSectionTypeById(match)
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
      Pseudocode for edit section type
      START
        - accept name from body and id from params
        - match _id with id and is_active true
        - fetch and update section type data
        - return Section type updated successfully
      END
   */
  editSectionType(req: Request, res: Response): void {
    const req_body = req.body;
    const sectionType_id: string = req.params.id;

    const match = {
      _id: new ObjectId(sectionType_id),
      is_active: true,
    };
    sectionTypeService
      .editSectionType(match, req_body)
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
      Pseudocode for delete section type
      START
        - accept id from params
        - match _id with id and is_active true
        - fetch and set is_active false
        - return Section type deleted successfully
      END
   */
  async deleteSectionType(req: any, res: Response): Promise<void> {
    const roleId: string = req.params.id;
    const match = { _id: new ObjectId(roleId), is_active: true };
    sectionTypeService
      .deleteSectionType(match)
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

export const sectionTypeController = new SectionTypeController();
