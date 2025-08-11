import mongoose, { Schema, model } from "mongoose";
import { slugify } from "../utils/slugify";
import { ILanguage } from "../interfaces";

const LanguageSchema = new Schema<ILanguage>(
  {
    name: { type: String, default: null },
    slug: { type: String, default: null },
    is_active: { type: Boolean, default: true },
    extras: { type: Object, default: {} },
  },
  { timestamps: true }
);
LanguageSchema.pre("save", async function (next) {
  if (this.isModified("name") && this.name) {
    /*
      Generating slug from slugify function and taking first 2 letters with lowercase
    */
    const baseSlug = slugify(this.name).substring(0, 2).toLowerCase();
    let slug = baseSlug;
    let count = 0;

    // Keep checking for slug conflicts
    //checking is slug is exist to db if not then creating slug else adding number to slug
    while (
      await mongoose
        .model("languages")
        .findOne({ slug: slug }, { slug: 1 })
        .sort({ createdAt: -1 })
    ) {
      count += 1;
      slug = `${baseSlug}${count}`;
    }

    this.slug = slug;
  }
  next();
});

const languageModel = model<ILanguage>("languages", LanguageSchema);

export default languageModel;
