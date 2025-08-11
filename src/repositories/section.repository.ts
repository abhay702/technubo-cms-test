import sectionModel from "../models/section.model";

export class SectionRepository {
  async createSection(data: object): Promise<any> {
    return sectionModel.create(data);
  }

  async getSectionById(match: object): Promise<any> {
    return sectionModel.findOne(match);
  }

  async updateSection(match: object, data: object) {
    return sectionModel.findOneAndUpdate(match, { $set: data }, { new: true });
  }
}
