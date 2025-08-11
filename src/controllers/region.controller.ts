import { Request, Response } from "express";
import { BaseControllerService } from "./base.controller";
import { HttpStatusCode, ResponseStatus } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";
import { RegionRepository } from "../repositories/region.repository";
import { RegionService } from "../services/region.service";

// Initialize repository and service instances
const regionRepository = new RegionRepository();
const regionService = new RegionService(regionRepository);

export class RegionController extends BaseControllerService {
  /*
      Pseudocode for create region
      START
        - accept name from body
        - generate slug from name before saving document
        - return Region created successfully
      END
   */
  createRegion(req: Request, res: Response): void {
    const req_body = req.body;
    regionService
      .createRegion(req_body)
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
      Pseudocode for get all regions
      START
        - accept name query params page, limit, search 
        - return all matching regions
      END
   */
  async getRegions(req: any, res: Response): Promise<void> {
    const query = req.query;
    regionService
      .getRegions(query)
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
      Pseudocode for get region by region_id
      START
        - accept region_id from parameter
        - match _id with region_id and is_active true
        - return region details 
      END
   */
  async getRegionById(req: any, res: Response): Promise<void> {
    const roleId: string = req.params.id;
    const match = { _id: new ObjectId(roleId), is_active: true };
    regionService
      .getRegionById(match)
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
      Pseudocode for edit region
      START
        - accept name from body and region_id from params
        - match _id with region_id and is_active true
        - fetch and update region data
        - return Region updated successfully
      END
   */
  editRegion(req: Request, res: Response): void {
    const req_body = req.body;
    const region_id: string = req.params.id;

    const match = {
      _id: new ObjectId(region_id),
      is_active: true,
    };
    regionService
      .editRegion(match, req_body)
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
      Pseudocode for delete region
      START
        - accept id from params
        - match _id with region_id and is_active true
        - fetch and set is_active false
        - return Region deleted successfully
      END
   */
  async deleteRegion(req: any, res: Response): Promise<void> {
    const roleId: string = req.params.id;
    const match = { _id: new ObjectId(roleId), is_active: true };
    regionService
      .deleteRegion(match)
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

export const regionController = new RegionController();
