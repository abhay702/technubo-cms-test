import { ResponseInterface } from "./response.interface";

export interface IPage {
  slug: string;
  title: string;
  locale: string;
  desc: string;
  sections: any;
  seo?: seoObj;
  translations?: translationsObj;
  published?: boolean;
  is_active?: boolean;
  extras?: object;
}

interface seoObj {
  metaTitle?: string;
  metaDesc?: string;
  metaImage?: string;
}

interface translationsObj {}

export interface IPageRepository {
  createPage(data: object): Promise<IPage>;
  getPageById(match: object): Promise<any>;
  updatePage(match: object, data: object): Promise<IPage | null>;
  getPages(match: object): Promise<any>;
  deletePage(data: object): Promise<null>;
  getExistingRecord(match: object): Promise<IPage | null>;
}

export interface GetAllParams {
  page: number; // Page number for pagination
  limit: number; // Number of items per page
  search: string; // Search query
  sort: string; // Sort field
  order: string; // Sort order (asc or desc)
}

export interface IPageService {
  createPage(data: object): Promise<ResponseInterface<IPage | null>>;
  getPageById(match: object): Promise<ResponseInterface<string | null>>;
  deletePage(match: object): Promise<ResponseInterface<null>>;
  getPages(match: object): Promise<ResponseInterface<any>>;
  editPage(
    match: object,
    data: object
  ): Promise<ResponseInterface<IPage | null>>;
}
