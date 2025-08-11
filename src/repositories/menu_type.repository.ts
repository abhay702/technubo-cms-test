import { menuTypeModel } from "../models/menu_type.model";
import { IMenuType } from "../interfaces/menu_type.interface";
import { FilterQuery } from "mongoose";

export class MenuTypeRepository {
  async createMenuType(data: object): Promise<IMenuType> {
    return menuTypeModel.create(data);
  }

  async getAllMenuTypes(): Promise<IMenuType[] | null> {
    return menuTypeModel.find({ is_active: true });
  }

  async getMenuTypeByFilter(
    filter: FilterQuery<IMenuType>
  ): Promise<IMenuType | null> {
    return menuTypeModel.findOne({ ...filter, is_active: true });
  }

  async getMenuTypeById(id: string) {
    return await menuTypeModel.findById(id);
  }

  async updateMenuType(id: string, data: Partial<IMenuType>) {
    return await menuTypeModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteMenuType(id: string) {
    return await menuTypeModel.findByIdAndDelete(id);
  }
}
