import mongoose, { Schema, model } from "mongoose";
import { slugify } from "../utils/slugify";
import { IRegion } from "../interfaces";
import { UserRepository } from "../repositories/user.repository";
const RegionSchema = new Schema<IRegion>(
  {
    name: { type: String, default: null },
    slug: { type: String, default: null },
    code: { type: String, default: null },
    is_active: { type: Boolean, default: true },
    extras: { type: Object, default: {} },
  },
  { timestamps: true }
);
RegionSchema.pre("save", async function (next) {
  if (this.isModified("name") && this.name) {
    /*
      Generating slug from region name from slugify function and taking first 3 letters with lowercase
    */
    const baseSlug = slugify(this.name).substring(0, 3).toLowerCase();
    let slug = baseSlug;
    let count = 0;

    // Keep checking for slug conflicts
    //checking is slug is exist to db if not then creating slug else adding number to slug
    while (
      await mongoose
        .model("regions")
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

const regionModel = model<IRegion>("regions", RegionSchema);

export default regionModel;
