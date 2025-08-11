import { IRole } from "../interfaces";
import roleModel from "../models/role.model";

export class RoleRepository {
  async createRecord(data: object): Promise<IRole> {
    return roleModel.create(data);
  }

  async getRoleById(match: object): Promise<any> {
    return roleModel.findOne(match);
  }

  async updateRecord(match: object, data: object) {
    return roleModel.updateOne(match, { $set: data }, { upsert: false });
  }

  async getRoles(query: any) {
    const { page = 1, limit = 10 } = query;

    const matchStage: any = {
      is_active: true,
    };

    const list = await roleModel
      .find(matchStage)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const total = await roleModel.countDocuments(matchStage);

    return {
      list,
      total,
    };
  }
}
