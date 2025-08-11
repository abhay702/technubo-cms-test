import dotenv from "dotenv";

/// Load .env from your local machine to work properly
dotenv.config({ path: "/opt/nubo-cms/nubo-cms-rest/.env" });

//dotenv.config({ path: "../.env" });
import { env } from "./src/environment/env";
import { App } from "./app";
import { middleware } from "./src/middleware/auth.middleware";
import {
  userRouter,
  roleRouter,
  regionRouter,
  languageRouter,
  sectionTypeRouter,
  pageRouter,
  fileUploadRouter,
  menuRouter,
  directoryRouter,
  menuTypeRouter,
  blogRouter,
} from "./src/routes/index.router";
import { Server } from "socket.io";
// import { userRouter } from "./routes/user.router";
// import { ApiVersion, Shopify } from "@shopify/shopify-api";
import { IEnv } from "./src/interfaces/IEnv";
import { defaultUser } from "./src/utils/default.user";
import mongoose from "mongoose";

const port: number = env().port ?? 8080;
console.log("running on port :", `${port}`);
let dbConString;

// admin.initializeApp({
//   credential: admin.credential.cert(googleFirebaseConfig),
// });
const envv: IEnv = env();
console.log("port---==>>", envv.port);
/**
 * Configure App instance
 */
const app = new App(
  port,
  middleware,
  [
    userRouter,
    roleRouter,
    regionRouter,
    languageRouter,
    sectionTypeRouter,
    pageRouter,
    fileUploadRouter,
    menuRouter,
    directoryRouter,
    menuTypeRouter,
    blogRouter,
  ] //* Add your express router objects here
);
/**
 * Connect to MongoDB
 */
try {
  dbConString = env().db.uri(
    env().db.user,
    env().db.pw,
    env().db.name,
    env().db.account
  );
} catch {
  console.log("Failed to create DB Connection string");
}

dbConString
  ? app.mongoDB(dbConString)
  : console.log("Not Starting MongoDB Connection");

// Run the seed after DB connection is confirmed
mongoose.connection.once("open", async () => {
  await defaultUser();
});

/**
 * Launch!
 */
// Define a global variable for the socket
export const global: { socket: Server } = { socket: new Server() };

// Assign the socket to the global variable
global.socket = app.io;
app.listen();
