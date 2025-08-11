import { Request, Response } from "express";
import { BaseControllerService } from "./base.controller";
import { HttpStatusCode, ResponseStatus } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";
import { PageRepository } from "../repositories/page.repository";
import { PageService } from "../services/page.service";

const pageRepository = new PageRepository();
const pageService = new PageService(pageRepository);

export class PageController extends BaseControllerService {
  /*
      Pseudocode for create page
      START
        - accept data from body
        - Check is page exist with slug and locale
        - IF is page exist
          THEN throw error "Slug already exists for this region"
          ENDIF
        - store all sections from data and return _id
        - store return section_ids to sections field
        - return Page created successfully
      END
   */
  createPage(req: Request, res: Response): void {
    const req_body = req.body;
    pageService
      .createPage(req_body)
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
      Pseudocode for get all pages
      START
        - accept name query params page, limit, search 
        - fetching all pages matching with is_active and published true
        - return all matching pages with count
      END
   */
  async getPages(req: any, res: Response): Promise<void> {
    const query = req.query;
    pageService
      .getPages(query)
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
      Pseudocode for get page by id
      START
        - accept page_id from parameter
        - match page_id with _id and is_active true
        - return page details
      END
   */
  async getPageById(req: any, res: Response): Promise<void> {
    const roleId: string = req.params.id;
    const match = {
      _id: new ObjectId(roleId),
      is_active: true,
      published: true,
    };
    pageService
      .getPageById(match)
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

  editPage(req: Request, res: Response): void {
    const req_body = req.body;
    const page_id: string = req.params.id;

    const match = {
      _id: new ObjectId(page_id),
      is_active: true,
    };
    pageService
      .editPage(match, req_body)
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
      Pseudocode for delete page
      START
        - accept page_id from page
        - match page_id with _id and is_active true
        - update is_active false
        - return Page deleted successfully
      END
   */
  async deletePage(req: any, res: Response): Promise<void> {
    const roleId: string = req.params.id;
    const match = { _id: new ObjectId(roleId), is_active: true };
    pageService
      .deletePage(match)
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
      Pseudocode for update page publish status
      START
        - accept page_id from page
        - match page_id with _id and is_active true
        - update published status
        - return Page status updated successfully
      END
   */
  pagePublishStatus(req: Request, res: Response): void {
    const req_body = req.body;
    const page_id: string = req.params.id;

    const match = {
      _id: new ObjectId(page_id),
      is_active: true,
    };
    pageService
      .editPage(match, req_body)
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
      Pseudocode for get page by id
      START
        - accept locale and slug from parameter
        - match slug, locale, is_active true and published true
        - fetch deails return result
        - IF result
          THEN return result
          ENDIF ELSE throw error "Page not found"
      END
   */
  async getPageBySlug(req: any, res: Response): Promise<void> {
    const locale: string = req.params.locale;
    const slug: string = req.params.slug;
    const match = {
      is_active: true,
      published: true,
      locale: locale,
      slug: slug,
    };
    pageService
      .getPageById(match)
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

export const pageController = new PageController();
