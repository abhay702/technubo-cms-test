import {
  IMenuType,
  IMenuTypeService,
  IMenuTypeRepository,
} from "../interfaces/menu_type.interface";

import { ResponseInterface } from "../interfaces/response.interface";
import { ResponseStatus, HttpStatusCode } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";

export class MenuTypeService implements IMenuTypeService {
  private menuTypeRepository: IMenuTypeRepository;

  constructor(menuTypeRepository: IMenuTypeRepository | any) {
    this.menuTypeRepository = menuTypeRepository;
  }

  async createMenuType(
    req_body: any
  ): Promise<ResponseInterface<IMenuType | null>> {
    const { name } = req_body;

    const isExist = await this.menuTypeRepository.getMenuTypeByFilter({
      $or: [{ name }],
      is_active: true,
    });

    if (isExist) {
      return {
        statusCode: HttpStatusCode.FORBIDDEN,
        response: {
          status: ResponseStatus.FAILURE,
          message: "MenuType with same name already exists",
          data: null,
        },
      };
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    const payload = {
      ...req_body,
      slug,
    };

    return this.menuTypeRepository
      .createMenuType(payload)
      .then((details: IMenuType) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "MenuType created successfully",
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

  getAllMenuTypes(query: object): Promise<ResponseInterface<any>> {
    return this.menuTypeRepository
      .getAllMenuTypes(query)
      .then(async (result) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "MenuTypes fetched successfully",
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

  getMenuTypeById(match: object): Promise<ResponseInterface<any>> {
    return this.menuTypeRepository
      .getMenuTypeById(match)
      .then(async (result: IMenuType) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "MenuType fetched successfully",
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

  deleteMenuType(match: object): Promise<ResponseInterface<null>> {
    return this.menuTypeRepository
      .updateMenuType(match, { is_active: false })
      .then(() => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "MenuType deleted successfully",
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

  async editMenuType(
    match: { _id: ObjectId },
    data: IMenuType
  ): Promise<ResponseInterface<IMenuType | null>> {
    return this.menuTypeRepository
      .updateMenuType(match, data)
      .then((Menu: IMenuType | null) => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "MenuType updated successfully",
          data: Menu,
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
