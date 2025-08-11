import { menuModel } from "../models/menu.modal";
import { IMenu } from "../interfaces/menu.interface";
import { FilterQuery } from "mongoose";

export class MenuRepository {
  async createMenu(data: object): Promise<IMenu> {
    return menuModel.create(data);
  }

  async getAllMenus(match: FilterQuery<IMenu>): Promise<IMenu[] | null> {
    const filter = { ...match, is_active: true };

    return menuModel.find(filter).populate({ path: "page_id", select: "slug" });
  }

  async getMenuByFilter(filter: FilterQuery<IMenu>): Promise<IMenu | null> {
    return menuModel.findOne(filter);
  }

  async getMenuById(id: string) {
    return await menuModel
      .findById(id)
      .populate({ path: "page_id", select: "slug" });
  }

  async updateMenu(id: string, data: Partial<IMenu>) {
    return await menuModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteMenu(id: string) {
    return await menuModel.findByIdAndDelete(id);
  }
}
