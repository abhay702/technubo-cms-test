import { ResponseInterface } from "./response.interface";

export interface IRegion {
  name: string;
  slug: string;
  code: string;
  is_active?: boolean;
  extras?: object;
}

export interface IRegionRepository {
  createRegion(data: object): Promise<IRegion>;
  getRegionById(match: object): Promise<IRegion>;
  updateRegion(match: object, data: object): Promise<IRegion | null>;
  getRegions(match: object): Promise<IRegion[] | null>;
  deleteRegion(data: object): Promise<null>;
}

export interface GetAllRegionParams {
  page: number; // Page number for pagination
  limit: number; // Number of items per page
  search: string; // Search query
  sort: string; // Sort field
  order: string; // Sort order (asc or desc)
}

export interface IRegionService {
  createRegion(data: object): Promise<ResponseInterface<IRegion | null>>;
  getRegionById(match: object): Promise<ResponseInterface<string | null>>;
  deleteRegion(match: object): Promise<ResponseInterface<null>>;
  getRegions(match: object): Promise<ResponseInterface<IRegion[] | null>>;
  editRegion(
    match: object,
    data: object
  ): Promise<ResponseInterface<IRegion | null>>;
}
