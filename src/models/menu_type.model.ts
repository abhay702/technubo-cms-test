import { Schema, model } from "mongoose";
import { IMenuType } from "../interfaces/menu_type.interface";

const MenuTypeSchema = new Schema<IMenuType>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const menuTypeModel = model<IMenuType>("menu_type", MenuTypeSchema);
