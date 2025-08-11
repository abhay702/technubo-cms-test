import { Response } from "express";
import { BaseControllerService } from "./base.controller";
import { HttpStatusCode, ResponseStatus } from "../enums/http.status.code.enum";
import { AwsS3 } from "../utils/aws.s3";
export class FileUploadController extends BaseControllerService {
  public async uploadFile(req: any, res: Response) {
    const files = req.files;
    const prefix = req.params.prefix;
    const dir = `${prefix}/`;
    const awsS3 = new AwsS3();

    if (files && files.length > 0) {
      const file = files[0];
      awsS3
        .uploadFile(file, dir)
        .then((url: any) => {
          res.status(HttpStatusCode.OK).json({
            status: ResponseStatus.SUCCESS,
            message: "file upload successfully",
            data: { url },
          });
        })
        .catch((err: any) => {
          res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: ResponseStatus.FAILURE,
            message: "Server Error",
            error: err,
          });
        });
    } else {
      res.status(HttpStatusCode.NOT_FOUND).json({
        status: ResponseStatus.FAILURE,
        message: "File not selected",
      });
    }
  }
}

export const fileUploadController = new FileUploadController();
