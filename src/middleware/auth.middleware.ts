import bodyParser from "body-parser";
import { env } from "../environment/env";
import { RequestCustome } from "../interfaces/GetUserAuthInfoRequest";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import cors from "cors";

export const middleware = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  // multer({ dest: process.cwd() + "/tmp" }).single("media"),
  cors(),
  function (req: Request, res: Response, next: NextFunction) {
    res.set("Cache-Control", "no-store, max-age=0");
    next();
  },
  function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  },

  async function (req: RequestCustome, res: Response, next: NextFunction) {
    // console.log("------")
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      req.isAuth = false;

      return next();
    }
    const token = authHeader.split(" ")[1];

    if (!token || token === "") {
      req.isAuth = false;
      return next();
    }
    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, env().JWT_SECRET);
    } catch (err) {
      console.log("Auth token err===?==>>", err);
      req.isAuth = false;
      return next();
    }
    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }
    // checking is deviceId exist or not

    req.isAuth = true;
    req.user = decodedToken.user;
    req._id = decodedToken._id;
    req.role = decodedToken.role;
    next();
  },
];
