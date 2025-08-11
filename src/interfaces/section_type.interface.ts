import { ResponseInterface } from "./response.interface";

export interface ISectionType {
  type: string;
  label: string;
  fields: any;
  is_active?: boolean;
  extras?: object;
}

export interface ISectionTypeRepository {
  createSectionType(data: object): Promise<ISectionType>;
  getSectionTypeById(match: object): Promise<ISectionType>;
  updateSectionType(match: object, data: object): Promise<ISectionType | null>;
  getSectionTypes(match: object): Promise<ISectionType[] | null>;
  deleteSectionType(data: object): Promise<null>;
}

export interface GetAllParams {
  page: number; // Page number for pagination
  limit: number; // Number of items per page
  search: string; // Search query
  sort: string; // Sort field
  order: string; // Sort order (asc or desc)
}

export interface ISectionTypeService {
  createSectionType(
    data: object
  ): Promise<ResponseInterface<ISectionType | null>>;
  getSectionTypeById(match: object): Promise<ResponseInterface<string | null>>;
  deleteSectionType(match: object): Promise<ResponseInterface<null>>;
  getSectionTypes(
    match: object
  ): Promise<ResponseInterface<ISectionType[] | null>>;
  editSectionType(
    match: object,
    data: object
  ): Promise<ResponseInterface<ISectionType | null>>;
}
