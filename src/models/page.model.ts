import { Schema, model } from "mongoose";
import { IPage } from "../interfaces";

const PageSchema = new Schema<IPage>(
  {
    title: { type: String, default: null },
    slug: { type: String, default: null },
    locale: { type: String, default: null },
    desc: { type: String, default: null },
    sections: { type: Array, default: [] },
    seo: {
      metaTitle: { type: String, default: null },
      metaDesc: { type: String, default: null },
      metaImage: { type: String, default: null },
    },
    translations: { type: Object, default: {} },
    published: { type: Boolean, default: true },
    is_active: { type: Boolean, default: true },
    extras: { type: Object, default: {} },
  },
  { timestamps: true }
);

const PageModel = model<IPage>("pages", PageSchema);

export default PageModel;
