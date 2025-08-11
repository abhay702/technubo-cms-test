import { FilterQuery } from "mongoose";
import { ResponseInterface } from "./response.interface";

export interface IMenuType {
  name: string;
  slug: string;
  is_active?: boolean;
}

export interface IMenuTypeRepository {
  getMenuTypeByFilter(
    filter: FilterQuery<IMenuType>
  ): Promise<IMenuType | null>;
  createMenuType(data: object): Promise<IMenuType>;
  getMenuTypeById(match: object): Promise<IMenuType>;
  updateMenuType(match: object, data: object): Promise<IMenuType | null>;
  getAllMenuTypes(match: object): Promise<IMenuType[] | null>;
  deleteMenuType(data: object): Promise<null>;
}

export interface IMenuTypeService {
  createMenuType(data: object): Promise<ResponseInterface<IMenuType | null>>;
  getMenuTypeById(match: object): Promise<ResponseInterface<string | null>>;
  deleteMenuType(match: object): Promise<ResponseInterface<null>>;
  getAllMenuTypes(
    match: object
  ): Promise<ResponseInterface<IMenuType[] | null>>;
  editMenuType(
    match: object,
    data: object
  ): Promise<ResponseInterface<IMenuType | null>>;
}
