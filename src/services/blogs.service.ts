import {
  IBlogsService,
  IBlogs,
  IBlogsRepository,
  GetAllBlogsParams,
} from "../interfaces";
import { ResponseInterface } from "../interfaces/response.interface";
import { ResponseStatus, HttpStatusCode } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";
import { SectionRepository } from "../repositories/section.repository";

const sectionRepository = new SectionRepository();
export class BlogService implements IBlogsService {
  private blogRepository: IBlogsRepository;

  constructor(blogRepository: IBlogsRepository | any) {
    this.blogRepository = blogRepository;
  }

  async createBlog(req_body: any): Promise<ResponseInterface<IBlogs | null>> {
    const existingSlug = await this.blogRepository.getBlogByMatch({
      slug: req_body.slug,
      locale: req_body.locale,
      is_active: true,
    });
    if (existingSlug) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        response: {
          status: ResponseStatus.FAILURE,
          message: "Slug already exists for this region",
          data: null,
        },
      };
    }
    return this.blogRepository
      .createBlog(req_body)
      .then((details: IBlogs) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Blog created successfully",
            data: details,
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

  getBlogs(
    query: GetAllBlogsParams
  ): Promise<ResponseInterface<{ list: IBlogs[]; total: number } | null>> {
    return this.blogRepository
      .getBlogs(query)
      .then(async (result) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Blogs fetched successfully",
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

  getBlogByMatch(match: object): Promise<ResponseInterface<IBlogs | null>> {
    return this.blogRepository
      .getBlogByMatch(match)
      .then((result: IBlogs | null) => {
        if (result) {
          return {
            statusCode: HttpStatusCode.OK,
            response: {
              status: ResponseStatus.SUCCESS,
              message: "Blog fetched successfully",
              data: result,
            },
          };
        } else {
          return {
            statusCode: HttpStatusCode.NOT_FOUND,
            response: {
              status: ResponseStatus.SUCCESS,
              message: "Blog not found",
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

  deleteBlog(match: object): Promise<ResponseInterface<null>> {
    return this.blogRepository
      .updateBlog(match, { is_active: false })
      .then(() => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Blog deleted successfully",
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

  async editBlog(
    match: { _id: ObjectId; is_active: boolean },
    data: IBlogs
  ): Promise<ResponseInterface<IBlogs | null>> {
    return this.blogRepository
      .updateBlog(match, data)
      .then((Blog: IBlogs | null) => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Blog updated successfully",
          data: Blog,
        },
      }))
      .catch((error: any) => ({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        response: {
          status: ResponseStatus.FAILURE,
          message: error.message,
          data: null,
        },
      }));
  }
}
