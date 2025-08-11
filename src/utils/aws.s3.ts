import { env } from "../environment/env";
import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import { IS3Creds } from "../interfaces/IEnv";
//const dirPath = env().S3Creds;
//AWS.config.loadFromPath(dirPath);
const s3Creds: IS3Creds = env().S3Creds;
AWS.config.update({
  accessKeyId: s3Creds.accessKeyId,
  secretAccessKey: s3Creds.secretAccessKey,
  region: s3Creds.region,
});

const s3 = new AWS.S3();

const myBucket = env().S3Creds.bucket;
export class AwsS3 {
  //const docBucket = '';
  async uploadFile(file: any, prefix: any) {
    return new Promise(function (resolve, reject) {
      fs.readFile(file.path, function (err: any, data: any) {
        if (err) {
          throw err;
        }

        const fileExt = path.extname(file.originalname);
        const myKey = prefix + Date.now() + fileExt;

        const params: any = {
          Bucket: myBucket,
          Key: myKey,
          Body: data,
          ContentType: file.mimetype,
        };
        s3.putObject(params, function (err: any) {
          if (err) {
            console.log("uploadFile : putObject", err);
            reject(err);
          } else {
            fs.unlinkSync(file.path);
            resolve(myKey);
          }
        });
      });
    });
  }
}
