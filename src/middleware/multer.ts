import { Request } from "express";
import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../environment/env";
const s3 = new S3Client({}); // need to pass credentials

import multerS3 from "multer-s3";

const locStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp");
    console.log(__dirname);
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "text/csv" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/octet-stream" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "video/mp4" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Image uploaded is not of type jpg/jpeg or png mimetype : ${file.mimetype}`
      ),
      false
    );
  }
};

const upload = multer({ storage: locStorage, fileFilter: fileFilter }).array(
  "file",
  10
);

const s3Upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: env().S3Creds.bucket ?? "cms-storage-s3-4084",
    key: function (req: Request, file: any, cb: any) {
      console.log(file);
      cb(null, file.originalname); //use Date.now() for unique file keys
    },
  }),
});

export { upload as mUpload, s3Upload as s3Upload };
