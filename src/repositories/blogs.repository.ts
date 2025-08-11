import { GetAllBlogsParams, IBlogs } from "../interfaces";
import { blogsModel } from "../models/blogs.model";

export class BlogRepository {
  async createBlog(data: object): Promise<IBlogs> {
    return blogsModel.create(data);
  }

  async getBlogByMatch(match: object): Promise<IBlogs | null> {
    return blogsModel.findOne(match);
  }

  async updateBlog(match: object, data: object): Promise<IBlogs | null> {
    return blogsModel.findOneAndUpdate(match, { $set: data }, { new: true });
  }

  async getBlogs(
    query: GetAllBlogsParams
  ): Promise<{ list: IBlogs[]; total: number } | null> {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      order = "desc",
    } = query;

    const sortOrder = order === "asc" ? 1 : -1;

    const matchStage: any = {
      is_active: true,
    };

    if (search) {
      matchStage.title = { $regex: search, $options: "i" };
    }

    const list = await blogsModel
      .find(matchStage)
      .select("title slug desc locale image")
      .sort({ [sort]: sortOrder })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const total = await blogsModel.countDocuments(matchStage);

    return {
      total,
      list,
    };
  }
}
