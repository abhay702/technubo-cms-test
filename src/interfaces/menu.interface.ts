import { ObjectId } from "mongodb";
import { HydratedDocument } from "mongoose";
import { ResponseInterface } from "./response.interface";

export interface IMenu {
  name: string;
  region?: string;
  lang: string;
  page_id?: ObjectId;
  menu_id: ObjectId | null;
  menu_type: string;
  is_active?: boolean;
  redirect_to?: string;
}

export interface IMenuTree extends IMenu {
  _id: string;
  children: IMenuTree[];
}

export interface IMenuRepository {
  getMenuByFilter(data: object): Promise<IMenu>;
  createMenu(data: object): Promise<IMenu>;
  getMenuById(match: object): Promise<IMenu>;
  updateMenu(match: object, data: object): Promise<IMenu | null>;
  getAllMenus(match: object): Promise<HydratedDocument<IMenu>[] | null>;
  deleteMenu(data: object): Promise<null>;
}

export interface IMenuService {
  createMenu(data: object): Promise<ResponseInterface<IMenu | null>>;
  getMenuById(match: object): Promise<ResponseInterface<string | null>>;
  deleteMenu(match: object): Promise<ResponseInterface<null>>;
  getAllMenus(match: object): Promise<ResponseInterface<IMenu[] | null>>;
  editMenu(
    match: object,
    data: object
  ): Promise<ResponseInterface<IMenu | null>>;
}
