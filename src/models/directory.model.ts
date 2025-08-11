import { Schema, model } from "mongoose";
import { IDirectory } from "../interfaces/directory.interface";

const DirectorySchema = new Schema<IDirectory>(
  {
    name: { type: String, default: null },
    parent_id: { type: Schema.Types.ObjectId, ref: "directory", default: null },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const directoryModel = model<IDirectory>("directory", DirectorySchema);
