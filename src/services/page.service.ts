import { IPageService, IPage, IPageRepository } from "../interfaces";
import { ResponseInterface } from "../interfaces/response.interface";
import { ResponseStatus, HttpStatusCode } from "../enums/http.status.code.enum";
import { ObjectId } from "mongodb";
import { SectionRepository } from "../repositories/section.repository";
import { ISection } from "../interfaces/section.interface";

const sectionRepository = new SectionRepository();
export class PageService implements IPageService {
  private pageRepository: IPageRepository;

  constructor(pageRepository: IPageRepository | any) {
    this.pageRepository = pageRepository;
  }

  async createPage(req_body: any): Promise<ResponseInterface<IPage | null>> {
    // cheking page exist with slug and locale
    const existingSlug = await this.pageRepository.getExistingRecord({
      slug: req_body.slug,
      locale: req_body.locale,
      is_active: true,
    });
    if (existingSlug) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        response: {
          status: ResponseStatus.FAILURE,
          message: "Slug already exists for this region",
          data: null,
        },
      };
    }
    // adding sections data to section table and returning _ids
    const mapped_section_ids = await Promise.all(
      req_body.sections.map(async (s: ISection) => {
        s.section_type_id = new ObjectId(String(s.section_type_id));
        const section_detail = await sectionRepository.createSection(s);
        return section_detail._id;
      })
    );

    req_body.sections = mapped_section_ids;
    return this.pageRepository
      .createPage(req_body)
      .then((details: any) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Page created successfully",
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

  getPages(query: object): Promise<ResponseInterface<any>> {
    return this.pageRepository
      .getPages(query)
      .then(async (result) => {
        return {
          statusCode: HttpStatusCode.OK,
          response: {
            status: ResponseStatus.SUCCESS,
            message: "Pages fetched successfully",
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

  getPageById(match: object): Promise<ResponseInterface<any>> {
    return this.pageRepository
      .getPageById(match)
      .then(async (result: any) => {
        if (result) {
          return {
            statusCode: HttpStatusCode.OK,
            response: {
              status: ResponseStatus.SUCCESS,
              message: "Page fetched successfully",
              data: result,
            },
          };
        } else {
          return {
            statusCode: HttpStatusCode.NOT_FOUND,
            response: {
              status: ResponseStatus.SUCCESS,
              message: "Page not found",
              data: {},
            },
          };
        }
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

  deletePage(match: object): Promise<ResponseInterface<null>> {
    return this.pageRepository
      .updatePage(match, { is_active: false })
      .then(() => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Page deleted successfully",
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

  async editPage(
    match: { _id: ObjectId; is_active: boolean },
    data: IPage
  ): Promise<ResponseInterface<IPage | null>> {
    return this.pageRepository
      .updatePage(match, data)
      .then((Page: any) => ({
        statusCode: HttpStatusCode.OK,
        response: {
          status: ResponseStatus.SUCCESS,
          message: "Page updated successfully",
          data: Page,
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
