import {
  ISectionType,
  ISectionTypeService,
  ISectionTypeRepository,
} from "../interfaces";
import { ResponseInterface } from "../interfaces/response.interface";
import { ResponseStatus, HttpStatusCode } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";

export class SectionTypeService implements ISectionTypeService {
  private sectionTypeRepository: ISectionTypeRepository;

  constructor(sectionTypeRepository: ISectionTypeRepository | any) {
    this.sectionTypeRepository = sectionTypeRepository;
  }

  async createSectionType(
    req_body: any
  ): Promise<ResponseInterface<ISectionType | null>> {
    const isExist = await this.sectionTypeRepository.getSectionTypeById({
      type: req_body.type,
      is_active: true,
    });
    if (isExist) {
      return {
        statusCode: HttpStatusCode.FORBIDDEN,
        response: {
          status: ResponseStatus.FAILURE,
          message: "SectionType already exists",
          data: null,
        },
      };
    }
    return this.sectionTypeRepository
      .createSectionType(req_body)
      .then((details: any) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "SectionType created successfully",
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

  getSectionTypes(query: object): Promise<ResponseInterface<any>> {
    return this.sectionTypeRepository
      .getSectionTypes(query)
      .then(async (result) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "SectionTypes fetched successfully",
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

  getSectionTypeById(match: object): Promise<ResponseInterface<any>> {
    return this.sectionTypeRepository
      .getSectionTypeById(match)
      .then(async (result: any) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "SectionType fetched successfully",
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

  deleteSectionType(match: object): Promise<ResponseInterface<null>> {
    return this.sectionTypeRepository
      .updateSectionType(match, { is_active: false })
      .then(() => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "SectionType deleted successfully",
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

  async editSectionType(
    match: { _id: ObjectId; is_active: boolean },
    data: ISectionType
  ): Promise<ResponseInterface<ISectionType | null>> {
    const isExist = await this.sectionTypeRepository.getSectionTypeById({
      type: data.type,
      _id: { $ne: match._id },
      is_active: true,
    });
    if (isExist) {
      return {
        statusCode: HttpStatusCode.FORBIDDEN,
        response: {
          status: ResponseStatus.FAILURE,
          message: "SectionType already exists",
          data: null,
        },
      };
    }
    return this.sectionTypeRepository
      .updateSectionType(match, data)
      .then((SectionType: any) => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "SectionType updated successfully",
          data: SectionType,
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
