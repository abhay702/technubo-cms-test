import { IPage } from "../interfaces";
import pageModel from "../models/page.model";

export class PageRepository {
  async createPage(data: object): Promise<IPage> {
    return pageModel.create(data);
  }

  async getExistingRecord(match: object): Promise<IPage | null> {
    return pageModel.findOne(match);
  }
  /*
    - Query to fetch matching page
    - add lookup on sections matching with _id from sections array
      - fetching section_types with section_type_id 
    -return page detail with sections and section_type
  */
  async getPageById(match: object): Promise<any> {
    const pipeline: any[] = [
      { $match: match },
      {
        $lookup: {
          from: "sections",
          localField: "sections",
          foreignField: "_id",
          as: "section",
          pipeline: [
            {
              $match: {
                is_active: true,
              },
            },
            {
              $sort: { order: 1 },
            },
            {
              $project: {
                type: 1,
                locale: 1,
                order: 1,
                data: 1,
              },
            },
            // {
            //   $lookup: {
            //     from: "section_types",
            //     localField: "section_type_id",
            //     foreignField: "_id",
            //     as: "section_type",
            //     pipeline: [
            //       {
            //         $match: {
            //           is_active: true,
            //         },
            //       },
            //     ],
            //   },
            // },
            // {
            //   $unwind: {
            //     path: `$section_type`,
            //     preserveNullAndEmptyArrays: true,
            //   },
            // },
          ],
        },
      },
      {
        $project: {
          title: 1,
          slug: 1,
          locale: 1,
          published: 1,
          section: 1,
        },
      },
    ];

    const result = await pageModel.aggregate(pipeline);
    return result[0];
  }

  async updatePage(match: object, data: object) {
    return pageModel.findOneAndUpdate(match, { $set: data }, { new: true });
  }
  /*
    - Query to fetch matching pages 
    - add lookup on sections matching with _id from sections array
      - fetching section_types with section_type_id 
    -return all pages with sections and section_type and its count
  */
  async getPages(query: any) {
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
      published: true,
    };

    if (search) {
      matchStage.$or = [
        { title: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { locale: { $regex: search, $options: "i" } },
      ];
    }

    const pipeline: any[] = [
      { $match: matchStage },
      {
        $lookup: {
          from: "sections",
          localField: "sections",
          foreignField: "_id",
          as: "section",
          pipeline: [
            {
              $match: {
                is_active: true,
              },
            },
            {
              $lookup: {
                from: "section_types",
                localField: "section_type_id",
                foreignField: "_id",
                as: "section_type",
                pipeline: [
                  {
                    $match: {
                      is_active: true,
                    },
                  },
                ],
              },
            },
            {
              $unwind: {
                path: `$section_type`,
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
        },
      },
      {
        $facet: {
          list: [
            { $sort: { [sort]: sortOrder } },
            { $skip: (Number(page) - 1) * Number(limit) },
            { $limit: Number(limit) },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await pageModel.aggregate(pipeline);
    const list = result[0]?.list || [];
    const total = result[0]?.totalCount?.[0]?.count || 0;

    return {
      total,
      list,
    };
  }
}
