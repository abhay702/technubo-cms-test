export interface IEnv {
  stage?: string | undefined;
  port: any | undefined;
  isDev: boolean;
  DOMAIN: string | undefined;
  db: IMongoDBCfg;
  S3Creds: IS3Creds;
  JWT_SECRET: string;
  FIREBASE_API_KEY: string | undefined;
}

export interface IElasticSearch {
  url: string | undefined;
  userId: string | undefined;
  password: string | undefined;
}
export interface IGmailDetails {
  user: string | undefined;
  pass: string | undefined;
}

export interface IMongoDBCfg {
  name: string | undefined;
  user: string | undefined;
  pw: string | undefined;
  account: string | undefined;
  uri: (user?: string, pw?: string, name?: string, account?: string) => string;
}

export interface IS3Creds {
  region: string | undefined;
  bucket: string | undefined;
  accessKeyId: string | undefined;
  secretAccessKey: string | undefined;
}
