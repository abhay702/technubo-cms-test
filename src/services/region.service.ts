import { IRegionService, IRegion, IRegionRepository } from "../interfaces";
import { ResponseInterface } from "../interfaces/response.interface";
import { ResponseStatus, HttpStatusCode } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";

export class RegionService implements IRegionService {
  private regionRepository: IRegionRepository;

  constructor(regionRepository: IRegionRepository | any) {
    this.regionRepository = regionRepository;
  }

  async createRegion(
    req_body: any
  ): Promise<ResponseInterface<IRegion | null>> {
    const isExist = await this.regionRepository.getRegionById({
      name: req_body.name,
      is_active: true,
    });
    if (isExist) {
      return {
        statusCode: HttpStatusCode.FORBIDDEN,
        response: {
          status: ResponseStatus.FAILURE,
          message: "Region already exists",
          data: null,
        },
      };
    }
    return this.regionRepository
      .createRegion(req_body)
      .then((details: any) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Region created successfully",
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

  getRegions(query: object): Promise<ResponseInterface<any>> {
    return this.regionRepository
      .getRegions(query)
      .then(async (result) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Regions fetched successfully",
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

  getRegionById(match: object): Promise<ResponseInterface<any>> {
    return this.regionRepository
      .getRegionById(match)
      .then(async (result: any) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Region fetched successfully",
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

  deleteRegion(match: object): Promise<ResponseInterface<null>> {
    return this.regionRepository
      .updateRegion(match, { is_active: false })
      .then(() => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Region deleted successfully",
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

  async editRegion(
    match: { _id: ObjectId; is_active: boolean },
    data: IRegion
  ): Promise<ResponseInterface<IRegion | null>> {
    const isExist = await this.regionRepository.getRegionById({
      name: data.name,
      _id: { $ne: match._id },
      is_active: true,
    });
    if (isExist) {
      return {
        statusCode: HttpStatusCode.FORBIDDEN,
        response: {
          status: ResponseStatus.FAILURE,
          message: "Region already exists",
          data: null,
        },
      };
    }
    return this.regionRepository
      .updateRegion(match, data)
      .then((region: any) => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Region updated successfully",
          data: region,
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
