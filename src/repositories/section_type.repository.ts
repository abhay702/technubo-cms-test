import { GetAllParams, ISectionType } from "../interfaces";
import sectionTypeModel from "../models/section_type.model";

export class SectionTypeRepository {
  async createSectionType(data: object): Promise<ISectionType> {
    return sectionTypeModel.create(data);
  }

  async getSectionTypeById(match: object): Promise<any> {
    return sectionTypeModel.findOne(match);
  }

  async updateSectionType(match: object, data: object) {
    return sectionTypeModel.findOneAndUpdate(
      match,
      { $set: data },
      { new: true }
    );
  }

  async getSectionTypes(query: GetAllParams) {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      order = "asc",
    } = query;

    const sortOrder = order === "asc" ? 1 : -1;

    const matchStage: any = {
      is_active: true,
    };

    if (search) {
      matchStage.label = { $regex: search, $options: "i" };
    }

    const list = await sectionTypeModel
      .find(matchStage)
      .sort({ [sort]: sortOrder })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const total = await sectionTypeModel.countDocuments(matchStage);

    return {
      list,
      total,
    };
  }
}
