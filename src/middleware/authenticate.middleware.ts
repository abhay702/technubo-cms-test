import { Response } from "express";
import { HttpStatusCode, ResponseStatus } from "../enums/http.status.code.enum";

export function Authorized(roles: string[]) {
  return function (req: any, res: Response, next: Function) {
    if (!req.isAuth) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: ResponseStatus.FAILURE,
        message: "Token is not valid",
        data: {},
      });
    }

    if (!roles.includes(req.role)) {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        status: ResponseStatus.FAILURE,
        message: "Unauthorized user",
        data: {},
      });
    }

    next();
  };
}
