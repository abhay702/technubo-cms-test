import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { IUser } from "../interfaces";

/**
 * UserSchema
 *
 * Mongoose schema for a user document.
 */
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, default: null },
    role_id: { type: ObjectId, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    is_active: { type: Boolean, default: true },
    extras: { type: Object, default: {} },
  },
  { timestamps: true }
);
/**
 * UserModel
 *
 * Mongoose model for user documents.
 */
const userModel = model<IUser>("user", UserSchema);

export default userModel;
