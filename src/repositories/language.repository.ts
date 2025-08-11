import { ILanguage } from "../interfaces";
import languageModel from "../models/language.model";

export class LanguageRepository {
  async createLanguage(data: object): Promise<ILanguage> {
    return languageModel.create(data);
  }

  async getLanguageById(match: object): Promise<any> {
    return languageModel.findOne(match);
  }

  async updateLanguage(match: object, data: object) {
    return languageModel.findOneAndUpdate(match, { $set: data }, { new: true });
  }

  async getLanguages(query: any) {
    const { page = 1, limit = 10 } = query;

    const matchStage: any = {
      is_active: true,
    };

    const list = await languageModel
      .find(matchStage)
      .sort({ name: 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const total = await languageModel.countDocuments(matchStage);

    return {
      list,
      total,
    };
  }
}
