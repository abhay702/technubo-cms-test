import {
  ILanguage,
  ILanguageRepository,
  ILanguageService,
} from "../interfaces";
import { ResponseInterface } from "../interfaces/response.interface";
import { ResponseStatus, HttpStatusCode } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";

export class LanguageService implements ILanguageService {
  private languageRepository: ILanguageRepository;

  constructor(languageRepository: ILanguageRepository | any) {
    this.languageRepository = languageRepository;
  }

  async createLanguage(
    req_body: any
  ): Promise<ResponseInterface<ILanguage | null>> {
    const isExist = await this.languageRepository.getLanguageById({
      name: req_body.name,
      is_active: true,
    });
    if (isExist) {
      return {
        statusCode: HttpStatusCode.FORBIDDEN,
        response: {
          status: ResponseStatus.FAILURE,
          message: "Language already exists",
          data: null,
        },
      };
    }
    return this.languageRepository
      .createLanguage(req_body)
      .then((details: any) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Language created successfully",
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

  getLanguages(query: object): Promise<ResponseInterface<any>> {
    return this.languageRepository
      .getLanguages(query)
      .then(async (result) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Languages fetched successfully",
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

  getLanguageById(match: object): Promise<ResponseInterface<any>> {
    return this.languageRepository
      .getLanguageById(match)
      .then(async (result: any) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Language fetched successfully",
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

  deleteLanguage(match: object): Promise<ResponseInterface<null>> {
    return this.languageRepository
      .updateLanguage(match, { is_active: false })
      .then(() => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Language deleted successfully",
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

  async editLanguage(
    match: { _id: ObjectId; is_active: boolean },
    data: ILanguage
  ): Promise<ResponseInterface<ILanguage | null>> {
    const isExist = await this.languageRepository.getLanguageById({
      name: data.name,
      _id: { $ne: match._id },
      is_active: true,
    });
    if (isExist) {
      return {
        statusCode: HttpStatusCode.FORBIDDEN,
        response: {
          status: ResponseStatus.FAILURE,
          message: "Language already exists",
          data: null,
        },
      };
    }
    return this.languageRepository
      .updateLanguage(match, data)
      .then((Language: any) => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Language updated successfully",
          data: Language,
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
