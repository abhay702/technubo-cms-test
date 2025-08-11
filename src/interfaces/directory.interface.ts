import { ObjectId } from "mongodb";
import { ResponseInterface } from "./response.interface";
import { HydratedDocument } from "mongoose";

export interface IDirectory {
  name: string | null;
  parent_id: ObjectId | null;
  is_active?: boolean;
}

export interface IDirectoryTree extends IDirectory {
  _id: string;
  children: IDirectoryTree[];
}

export interface PaginatedDirectoryResponse {
  totalcount: number;
  page?: number;
  limit?: number;
  records: IDirectoryTree[];
}

export interface IDirectoryRepository {
  createDirectory(data: object): Promise<IDirectory>;
  getDirectoryById(match: object): Promise<IDirectory>;
  updateDirectory(match: object, data: object): Promise<IDirectory | null>;
  getAllDirectories(
    filter: object,
    skip: number,
    limit: number
  ): Promise<{ data: HydratedDocument<IDirectory>[]; totalcount: number }>;
  getDirectoryByFilter(filter: object): Promise<IDirectory | null>;
  deleteDirectory(match: object): Promise<null>;
}

export interface IDirectoryService {
  createDirectory(data: object): Promise<ResponseInterface<IDirectory | null>>;
  getDirectoryById(match: object): Promise<ResponseInterface<string | null>>;
  deleteDirectory(match: object): Promise<ResponseInterface<null>>;
  getAllDirectories(
    query: object
  ): Promise<ResponseInterface<PaginatedDirectoryResponse | null>>;
  editDirectory(
    match: object,
    data: object
  ): Promise<ResponseInterface<IDirectory | null>>;
}
