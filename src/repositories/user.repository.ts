import { DeleteResult, ObjectId } from "mongodb";
import { IUser } from "../interfaces";
import userModel from "../models/user.model";

export class UserRepository {
  async createRecord(data: object): Promise<IUser> {
    return userModel.create(data);
  }

  async getExistRecord(match: object): Promise<any> {
    return userModel.findOne(match);
  }

  async updateUser(match: object, data: object) {
    return userModel.findOneAndUpdate(match, { $set: data }, { upsert: false });
  }

  async getUserList(match: any) {
    const { search, page_no = 1, page_size = 10 } = match.query;

    const matchStage: any = {
      is_active: true,
    };

    if (search) {
      matchStage.name = { $regex: search, $options: "i" };
    }

    const pipeline: any[] = [
      { $match: matchStage },

      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "roleData",
        },
      },
      {
        $unwind: {
          path: "$roleData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $facet: {
          list: [
            { $sort: { createdAt: -1 } },
            { $skip: (Number(page_no) - 1) * Number(page_size) },
            { $limit: Number(page_size) },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await userModel.aggregate(pipeline);
    const list = result[0]?.list || [];
    const total = result[0]?.totalCount?.[0]?.count || 0;

    return {
      list,
      total,
    };
  }

  async deleteUser(match: object): Promise<DeleteResult> {
    return userModel.deleteOne(match);
  }
}
