import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
const SectionSchema = new Schema(
  {
    type: { type: String, default: null },
    locale: { type: String, default: null },
    order: { type: Number, default: null },
    data: {
      type: Object,
      default: {},
    },
    section_type_id: { type: ObjectId, default: null },
    is_active: { type: Boolean, default: true },
    extras: { type: Object, default: {} },
  },
  { timestamps: true }
);

const sectionModel = model("sections", SectionSchema);

export default sectionModel;
