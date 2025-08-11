import { ObjectId } from "mongodb";
import { ResponseInterface } from "./response.interface";

export interface ISection {
  type: string;
  locale: string;
  order: number;
  data: object;
  section_type_id: ObjectId;
  is_active?: boolean;
  extras?: object;
}

export interface ISectionRepository {
  createSection(data: object): Promise<ISection>;
  getSectionById(match: object): Promise<ISection>;
  updateSection(match: object, data: object): Promise<ISection | null>;
}

export interface ISectionService {
  createSection(data: object): Promise<ResponseInterface<ISection | null>>;
  getSectionById(match: object): Promise<ResponseInterface<ISection | null>>;
  editSection(
    match: object,
    data: object
  ): Promise<ResponseInterface<ISection | null>>;
}
