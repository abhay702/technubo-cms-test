import { Schema, model } from "mongoose";
import { IBlogs } from "../interfaces";

const BlogsSchema = new Schema<IBlogs>(
  {
    title: { type: String, default: null },
    desc: { type: String, default: null },
    content: { type: String, default: null },
    locale: { type: String, default: "en" },
    slug: { type: String, default: null },
    is_active: { type: Boolean, default: true },
    image: { type: String, default: null },
  },
  { timestamps: true }
);

export const blogsModel = model<IBlogs>("blogs", BlogsSchema);
