import { IEnv } from "../interfaces/IEnv";

export const env: () => IEnv = () => {
  return {
    stage: process.env.ENVIRONMENT,
    port: process.env.PORT,
    isDev: process.env.NODE_ENV == "dev",
    DOMAIN: process.env.DOMAIN,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    db: {
      name: process.env.MONGODB_NAME,
      user: process.env.MONGODB_USER,
      pw: process.env.MONGODB_PSWD,
      account: process.env.MONGODB_ACCOUNT,
      uri: (user?: string, pw?: string, name?: string, account?: string) => {
        console.log("user name.." + user);
        console.log("database name.." + name);
        console.log(
          "database url.." +
            `mongodb+srv://${user}:${pw}${account}.mongodb.net/${name}?retryWrites=true&w=majority`
        );
        if (process.env.NODE_ENV == "dev") {
          return `mongodb+srv://${user}:${pw}${account}.mongodb.net/${name}?retryWrites=true&w=majority`;
        } else {
          return `mongodb+srv://${user}:${pw}${account}.mongodb.net/${name}?retryWrites=true&w=majority`;
        }
      },
    },
    S3Creds: {
      region: process.env.S3CREDS_REGION,
      bucket: process.env.S3CREDS_BUCKET,
      accessKeyId: process.env.S3CREDS_ACCESSKEYID,
      secretAccessKey: process.env.S3CREDS_SECRETKEY,
    },
    JWT_SECRET: process.env?.JWT_SECRET ? process.env?.JWT_SECRET : "",
  };
};
