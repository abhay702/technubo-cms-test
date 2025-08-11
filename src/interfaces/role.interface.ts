export interface IRole {
  name: string;
  slug?: string;
  is_active?: boolean;
  extras?: object;
}

export interface IRoleRepository {
  createRecord(data: object): Promise<IRole>;
  getRoleById(match: object): Promise<IRole>;
  getRoles(match: object): Promise<IRole[] | null>;
  deleterole(data: object): Promise<null>;
  updateRecord(match: object, data: object): Promise<null>;
}
