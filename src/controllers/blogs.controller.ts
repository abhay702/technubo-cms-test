import { Request, Response } from "express";
import { BaseControllerService } from "./base.controller";
import { HttpStatusCode, ResponseStatus } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";
import { BlogRepository } from "../repositories/blogs.repository";
import { BlogService } from "../services/blogs.service";

const blogRepository = new BlogRepository();
const blogService = new BlogService(blogRepository);

export class BlogsController extends BaseControllerService {
  /*
      Pseudocode for create blog
      START
        - accept data from body
        - Check is blog exist with slug and locale
        - IF is blog exist
          THEN throw error "Slug already exists for this region"
          ENDIF
        - return Blog created successfully
      END
   */
  createBlog(req: Request, res: Response): void {
    const req_body = req.body;
    blogService
      .createBlog(req_body)
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
      Pseudocode for get all blogs
      START
        - accept name query params page, limit, search by title
        - fetching all blogs matching with is_active true
        - return all matching blogs with count
      END
   */
  async getBlogs(req: any, res: Response): Promise<void> {
    const query = req.query;
    blogService
      .getBlogs(query)
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
      Pseudocode for get blog by id
      START
        - accept blog_id from parameter
        - match blog_id with _id and is_active true
        - return blog details
      END
   */
  async getBlogById(req: any, res: Response): Promise<void> {
    const blog_id: string = req.params.id;
    const match = {
      _id: new ObjectId(blog_id),
      is_active: true,
    };
    blogService
      .getBlogByMatch(match)
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
      Pseudocode for get blog by id
      START
        - accept blog_id from parameter and payload
        - match blog_id with _id and is_active true
        - update data
        - return blog details
      END
   */
  editBlog(req: Request, res: Response): void {
    const req_body = req.body;
    const blog_id: string = req.params.id;

    const match = {
      _id: new ObjectId(blog_id),
      is_active: true,
    };
    blogService
      .editBlog(match, req_body)
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
      Pseudocode for delete blog
      START
        - accept blog_id from params
        - match blog_id with _id and is_active true
        - update is_active false
        - return Blog deleted successfully
      END
   */
  async deleteBlog(req: any, res: Response): Promise<void> {
    const roleId: string = req.params.id;
    const match = { _id: new ObjectId(roleId), is_active: true };
    blogService
      .deleteBlog(match)
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
      Pseudocode for get blog by id
      START
        - accept locale and slug from parameter
        - match slug, locale, is_active true true
        - fetch deails return result
        - IF result
          THEN return result
          ENDIF ELSE throw error "Blog not found"
      END
   */
  async getBlogBySlug(req: any, res: Response): Promise<void> {
    const locale: string = req.params.locale;
    const slug: string = req.params.slug;
    const match = {
      is_active: true,
      locale: locale,
      slug: slug,
    };
    blogService
      .getBlogByMatch(match)
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

export const blogsController = new BlogsController();
