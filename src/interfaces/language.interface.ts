import { ResponseInterface } from "./response.interface";

export interface ILanguage {
  name: string;
  slug: string;
  is_active?: boolean;
  extras?: object;
}

export interface ILanguageRepository {
  createLanguage(data: object): Promise<ILanguage>;
  getLanguageById(match: object): Promise<ILanguage>;
  updateLanguage(match: object, data: object): Promise<ILanguage | null>;
  getLanguages(match: object): Promise<ILanguage[] | null>;
  deleteLanguage(data: object): Promise<null>;
}

export interface GetAllLanguageParams {
  page: number; // Page number for pagination
  limit: number; // Number of items per page
  search: string; // Search query
  sort: string; // Sort field
  order: string; // Sort order (asc or desc)
}

export interface ILanguageService {
  createLanguage(data: object): Promise<ResponseInterface<ILanguage | null>>;
  getLanguageById(match: object): Promise<ResponseInterface<string | null>>;
  deleteLanguage(match: object): Promise<ResponseInterface<null>>;
  getLanguages(match: object): Promise<ResponseInterface<ILanguage[] | null>>;
  editLanguage(
    match: object,
    data: object
  ): Promise<ResponseInterface<ILanguage | null>>;
}
