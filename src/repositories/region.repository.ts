import { IRegion } from "../interfaces";
import regionModel from "../models/region.model";

export class RegionRepository {
  async createRegion(data: object): Promise<IRegion> {
    return regionModel.create(data);
  }

  async getRegionById(match: object): Promise<any> {
    return regionModel.findOne(match);
  }

  async updateRegion(match: object, data: object) {
    return regionModel.findOneAndUpdate(match, { $set: data }, { new: true });
  }

  async getRegions(query: any) {
    const { page = 1, limit = 10 } = query;

    const matchStage: any = {
      is_active: true,
    };

    const list = await regionModel
      .find(matchStage)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const total = await regionModel.countDocuments(matchStage);

    return {
      list,
      total,
    };
  }
}
