import { Schema, model } from "mongoose";
import { IMenu } from "../interfaces/menu.interface";

const MenuSchema = new Schema<IMenu>(
  {
    name: { type: String, required: true },
    region: { type: String, default: null },
    lang: { type: String, required: true },
    page_id: {
      type: Schema.Types.ObjectId,
      ref: "pages",
      default: null,
    },
    menu_id: { type: Schema.Types.ObjectId, ref: "menu", default: null },
    menu_type: { type: String, required: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const menuModel = model<IMenu>("menu", MenuSchema);
