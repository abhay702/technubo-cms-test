import { Schema, model } from "mongoose";
import { IRole } from "../interfaces/role.interface";
import { slugify } from "../utils/slugify";

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, default: null },
    slug: { type: String, default: null },
    is_active: { type: Boolean, default: true },
    extras: { type: Object, default: {} },
  },
  { timestamps: true }
);
RoleSchema.pre("save", function (next) {
  if (this.isModified("name") && this.name) {
    /*
      Generating role slug using slugify function with lowercase letters
    */
    this.slug = slugify(this.name);
  }
  next();
});

const roleModel = model<IRole>("role", RoleSchema);

export default roleModel;
