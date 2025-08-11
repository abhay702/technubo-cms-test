import { env } from "../environment/env";
import jwt from "jsonwebtoken";
export class auth {
  constructor() {
    // super(new UserModel());
  }
  getToken(user: any, role: string) {
    const token = jwt.sign(
      {
        _id: user._id,
        user: user,
        role: role,
      },
      env().JWT_SECRET,
      {
        expiresIn: "12000h",
      }
    );

    return token;
  }
}
