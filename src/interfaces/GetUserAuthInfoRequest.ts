import { Request } from "express";
export interface RequestCustome extends Request {
  isAuth: boolean; // or any other type
  _id: string;
  user: object;
  role: string;
}
