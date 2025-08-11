import {
  IDirectory,
  IDirectoryService,
  IDirectoryRepository,
  IDirectoryTree,
  PaginatedDirectoryResponse,
} from "../interfaces/directory.interface";
import { ResponseInterface } from "../interfaces/response.interface";
import { HttpStatusCode, ResponseStatus } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";
import { isValidObjectId } from "mongoose";

export class DirectoryService implements IDirectoryService {
  private directoryRepository: IDirectoryRepository;

  constructor(directoryRepository: IDirectoryRepository | any) {
    this.directoryRepository = directoryRepository;
  }

  async createDirectory(
    req_body: any
  ): Promise<ResponseInterface<IDirectory | null>> {
    const { name } = req_body;

    const isExist = await this.directoryRepository.getDirectoryByFilter({
      name,
    });
    if (isExist) {
      return {
        statusCode: HttpStatusCode.FORBIDDEN,
        response: {
          status: ResponseStatus.FAILURE,
          message: "Directory with the same name already exists",
          data: null,
        },
      };
    }

    if (req_body.parent_id) {
      req_body.parent_id = new ObjectId(String(req_body.parent_id));
    }

    return this.directoryRepository
      .createDirectory(req_body)
      .then((details) => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Directory created successfully",
          data: details,
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

  async getAllDirectories(
    query: any
  ): Promise<ResponseInterface<PaginatedDirectoryResponse | null>> {
    const { parent_id } = query;

    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.max(parseInt(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const filter: any = { is_active: true };

    return Promise.resolve()
      .then(() => {
        if (!parent_id) {
          filter.parent_id = null;
          return "Parent directories fetched successfully";
        }

        if (!isValidObjectId(parent_id)) {
          throw {
            statusCode: HttpStatusCode.BAD_REQUEST,
            response: {
              status: ResponseStatus.FAILURE,
              message: "Invalid parent_id format",
              data: null,
            },
          };
        }

        filter.parent_id = new ObjectId(parent_id);
        return "Child directories fetched successfully";
      })
      .then((message) => {
        return this.directoryRepository
          .getAllDirectories(filter, skip, limit)
          .then(({ data, totalcount }) => {
            const directories: IDirectoryTree[] = data.map((directory) => ({
              ...directory.toObject(),
              _id: String(directory._id),
              children: [],
            }));

            return {
              statusCode: HttpStatusCode.OK,
              response: {
                status: ResponseStatus.SUCCESS,
                message,
                data: {
                  totalcount,
                  records: directories,
                },
              },
            };
          });
      })
      .catch((error) => {
        if (error.statusCode && error.response) {
          return error;
        }

        return {
          statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
          response: {
            status: ResponseStatus.FAILURE,
            message: error.message || "Something went wrong",
            data: null,
          },
        };
      });
  }

  getDirectoryById(match: object): Promise<ResponseInterface<any>> {
    return this.directoryRepository
      .getDirectoryById(match)
      .then((result: IDirectory) => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Directory fetched successfully",
          data: result,
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

  deleteDirectory(match: object): Promise<ResponseInterface<null>> {
    return this.directoryRepository
      .updateDirectory(match, { is_active: false })
      .then(() => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Directory deleted successfully",
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

  async editDirectory(
    match: { _id: ObjectId },
    data: IDirectory
  ): Promise<ResponseInterface<IDirectory | null>> {
    return this.directoryRepository
      .updateDirectory(match, data)
      .then((directory: IDirectory | null) => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Directory updated successfully",
          data: directory,
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
}
