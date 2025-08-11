import jwt from "jsonwebtoken";
import { env } from "../environment/env";

export const socketmiddleware = (socket: any, next: any) => {
  let token = socket.handshake.auth.token;

  if (!token) {
    token = socket.handshake.query.token;
  }

  if (!token) {
    socket.isAuth = false;
    return next();
  }

  // const token = authHeader.split(' ')[1]; // Authorization: Bearer asdmaklsda
  if (!token || token === "") {
    socket.isAuth = false;
    return next();
  }

  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, env().JWT_SECRET);
  } catch (err) {
    console.log("error", err);
    socket.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    socket.isAuth = false;
    return next();
  }
  //console.log("socket decodedToken----==>>", decodedToken);
  //console.log(decodedToken);
  socket.isAuth = true;
  socket.usrId = decodedToken.id; // user's id, i.e. primary key

  // console.log("decodedToken--==>>", decodedToken.payload.urole)
  next();
};
