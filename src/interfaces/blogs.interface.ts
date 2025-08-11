import { ResponseInterface } from "./response.interface";

export interface IBlogs {
  title: string;
  desc: string;
  content: string;
  locale: string;
  slug: string;
  is_active?: boolean;
  extras?: object;
  image?: string;
}

export interface IBlogsRepository {
  createBlog(data: object): Promise<IBlogs>;
  getBlogByMatch(match: object): Promise<IBlogs | null>;
  updateBlog(match: object, data: object): Promise<IBlogs | null>;
  getBlogs(
    match: GetAllBlogsParams
  ): Promise<{ list: IBlogs[]; total: number } | null>;
  deleteBlog(data: object): Promise<null>;
}

export interface IBlogsService {
  createBlog(data: object): Promise<ResponseInterface<IBlogs | null>>;
  getBlogByMatch(match: object): Promise<ResponseInterface<IBlogs | null>>;
  deleteBlog(match: object): Promise<ResponseInterface<null>>;
  getBlogs(
    match: GetAllBlogsParams
  ): Promise<ResponseInterface<{ list: IBlogs[]; total: number } | null>>;
  editBlog(
    match: object,
    data: object
  ): Promise<ResponseInterface<IBlogs | null>>;
}

export interface GetAllBlogsParams {
  page: number; // Page number for pagination
  limit: number; // Number of items per page
  search: string; // Search query
  sort: string; // Sort field
  order: string; // Sort order (asc or desc)
}
