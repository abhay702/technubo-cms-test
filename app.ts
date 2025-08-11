import { Application } from "express";
import express from "express";
import mongoose from "mongoose";
import { socketmiddleware } from "./src/middleware/socket.auth";
// const Sequelize = require("sequelize");
import dotenv from "dotenv";
// const usersRouter = require("./routes/user.router");
dotenv.config({ path: "/opt/nubo-cms/nubo-cms-rest/.env" });
import http from "http";
import * as socketio from "socket.io";
// const nodeCron = require("node-cron");
import { Socket } from "socket.io";

// import io from "socket.io";
// import { initDB } from "./models";

/**
 * Primary Class that constructs all of the parts of the Express server
 */
export class App {
  public app: Application;
  public httpServer;
  public io: any;

  /**
   * @param port Port Application listens on
   * @param middleware Array of middleware to be applied to app
   * @param routes Array of express.Router objects for application routes
   * @param apiPath Base path for this api that will be prepended to all routes
   * @param staticPath path to folder for public files express will make available
   */
  constructor(
    private port: number,
    middleware: Array<any>,
    routes: Array<express.Router>,
    private apiPath: string = "/api",
    private staticPath: string = "public"
  ) {
    //* Create a new express app
    this.app = express();

    this.httpServer = http.createServer(this.app);

    const options = {
      /* ... */
    };
    this.io = new socketio.Server(this.httpServer, options);
    this.io.use(socketmiddleware);
    this.io.use(function (socket: any, next: any) {
      if (socket.isAuth) {
        console.log(socket.usrId);
        next();
      } else {
        console.log("token err..");
        next(new Error("Authentication error"));
      }
    });
    this.io.on("connection", (socket: Socket) => {
      console.log("socket", socket);
    });

    this.middleware(middleware);

    this.routes(routes);

    this.assets(this.staticPath);

    this.boostrap();
  }

  /**
   * @param mware Array of middlewares to be loaded into express app
   */
  private middleware(mware: any[]) {
    mware.forEach((m) => {
      this.app.use(m);
    });
  }

  public addMiddleWare(middleWare: any) {
    this.app.use(middleWare);
  }

  /**
   * Attaches route objects to app, appending routes to `apiPath`
   * @param routes Array of router objects to be attached to the app
   */
  private routes(routes: Array<express.Router>) {
    routes.forEach((r) => {
      this.app.use(`${this.apiPath}`, r);
    });
    // this.app.use(`${this.apiPath}/user`, usersRouter);
  }

  /**
   * Enable express to serve up static assets
   */
  private assets(path: string) {
    this.app.use(express.static(path));
  }

  /**
   * Creates a connection to a MongoDB instance using mongoose
   * @param uri MongoDB connection string
   */
  public mongoDB(uri: string) {
    const connect = () => {
      mongoose
        .connect(uri, {
          serverSelectionTimeoutMS: 30000,
          maxPoolSize: 20, // Increase pool size
          minPoolSize: 5,
          maxIdleTimeMS: 30000,
        })
        .then(() => {
          console.log("Mongo successfully connected");
          return;
        })
        .catch((error) => {
          console.log("DATABASE CONNECTION FAILED \n", error);
          return process.exit(1);
        });
    };
    connect();
    mongoose.connection.on("disconnected", connect);
  }
  private async boostrap() {
    // Connect to db
    // await initDB();
    // add Controllers
    // super.addControllers([new UserController()]);
  }

  public listen(): void {
    const port = this.port || 3000;

    this.httpServer.listen(port, () => {
      console.log("Server listening on port: " + port);
    });
  }
  public closeServer(): void {
    this.httpServer.close();
  }
}
