import {
  IMenu,
  IMenuService,
  IMenuRepository,
  IMenuTree,
} from "../interfaces/menu.interface";

import { ResponseInterface } from "../interfaces/response.interface";
import { ResponseStatus, HttpStatusCode } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";
import { HydratedDocument } from "mongoose";
import { menuTypeModel } from "../models/menu_type.model";

export class MenuService implements IMenuService {
  private menuRepository: IMenuRepository;

  constructor(menuRepository: IMenuRepository | any) {
    this.menuRepository = menuRepository;
  }

  async createMenu(req_body: any): Promise<ResponseInterface<IMenu | null>> {
    const { name, region, lang, page_id, menu_id, menu_type } = req_body;

    const isExist = await this.menuRepository.getMenuByFilter({
      name: name,
      menu_type: menu_type,
      region: region,
      lang: lang,
    });

    if (isExist) {
      return {
        statusCode: HttpStatusCode.FORBIDDEN,
        response: {
          status: ResponseStatus.FAILURE,
          message: "Menu with same name, region and lang already exists",
          data: null,
        },
      };
    }

    const menuType = await menuTypeModel.findOne({ slug: menu_type });
    if (!menuType) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        response: {
          status: ResponseStatus.FAILURE,
          message: "Invalid menu_type slug",
          data: null,
        },
      };
    }

    req_body.menu_type = menuType.slug;
    if (req_body.page_id) req_body.page_id = new ObjectId(String(page_id));
    if (menu_id) {
      req_body.menu_id = new ObjectId(String(menu_id));
    }

    return this.menuRepository
      .createMenu(req_body)
      .then((details: IMenu) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Menu created successfully",
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

  async getAllMenus(
    query: any,
    params?: any
  ): Promise<ResponseInterface<IMenuTree[]>> {
    let match: any = {};
    if (query.menu_type_slug) {
      match.menu_type = query.menu_type_slug;
    }

    if (query.region) {
      match.locale = query.region;
    }

    if (query.lang) {
      match.lang = query.lang;
    }

    if (params?.id) {
      try {
        match.page_id = new ObjectId(params.id);
      } catch (e) {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          response: {
            status: ResponseStatus.FAILURE,
            message: "Invalid page_id in path",
            data: [],
          },
        };
      }
    }

    return this.menuRepository
      .getAllMenus(match)
      .then((flatMenus: HydratedDocument<IMenu>[] | null) => {
        if (!flatMenus) {
          return {
            statusCode: HttpStatusCode.OK,
            response: {
              status: ResponseStatus.SUCCESS,
              message: "No menus found",
              data: [],
            },
          };
        }

        const menuMap = new Map<string, IMenuTree>();
        const roots: IMenuTree[] = [];

        flatMenus.forEach((menu) => {
          const menuWithChildren: IMenuTree = {
            ...menu.toObject(),
            _id: String(menu._id),
            children: [],
          };
          menuMap.set(menuWithChildren._id, menuWithChildren);
        });

        menuMap.forEach((menu) => {
          if (menu.menu_id) {
            const parent = menuMap.get(String(menu.menu_id));
            if (parent) {
              parent.children.push(menu);
            }
          } else {
            roots.push(menu);
          }
        });

        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Menus fetched successfully",
            data: roots,
          },
        };
      })
      .catch((error) => ({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        response: {
          status: ResponseStatus.FAILURE,
          message: error.message,
          data: [],
        },
      }));
  }

  getMenuById(match: object): Promise<ResponseInterface<any>> {
    return this.menuRepository
      .getMenuById(match)
      .then(async (result: IMenu) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Menu fetched successfully",
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

  deleteMenu(match: object): Promise<ResponseInterface<null>> {
    return this.menuRepository
      .updateMenu(match, { is_active: false })
      .then(() => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Menu deleted successfully",
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

  async editMenu(
    match: { _id: ObjectId },
    data: IMenu
  ): Promise<ResponseInterface<IMenu | null>> {
    return this.menuRepository
      .updateMenu(match, data)
      .then((Menu: IMenu | null) => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Menu updated successfully",
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
