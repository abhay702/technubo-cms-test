import { directoryModel } from "../models/directory.model";
import { IDirectory } from "../interfaces/directory.interface";
import { FilterQuery, HydratedDocument } from "mongoose";

export class DirectoryRepository {
  async createDirectory(data: object): Promise<IDirectory> {
    return directoryModel.create(data);
  }

  async getAllDirectories(
    filter: FilterQuery<IDirectory>,
    skip: number,
    limit: number
  ): Promise<{ data: HydratedDocument<IDirectory>[]; totalcount: number }> {
    const query = { ...filter, is_active: true };

    const [data, totalcount] = await Promise.all([
      directoryModel.find(query).skip(skip).limit(limit),
      directoryModel.countDocuments(query),
    ]);

    return { data, totalcount };
  }

  async getDirectoryByFilter(
    filter: FilterQuery<IDirectory>
  ): Promise<IDirectory | null> {
    return directoryModel.findOne(filter);
  }

  async getDirectoryById(id: string) {
    return await directoryModel.findById(id);
  }

  async updateDirectory(id: string, data: Partial<IDirectory>) {
    return await directoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteDirectory(id: string) {
    return await directoryModel.findByIdAndDelete(id);
  }
}
