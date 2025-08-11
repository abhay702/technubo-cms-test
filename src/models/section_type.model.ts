import { Schema, model } from "mongoose";
import { ISectionType } from "../interfaces";

const SectionTypeSchema = new Schema<ISectionType>(
  {
    type: { type: String, default: null },
    label: { type: String, default: null },
    fields: { type: Array, default: [] },
    is_active: { type: Boolean, default: true },
    extras: { type: Object, default: {} },
  },
  { timestamps: true }
);

const sectionTypeModel = model<ISectionType>(
  "section_types",
  SectionTypeSchema
);

export default sectionTypeModel;
