import { ObjectId } from "mongodb";
import { RoleEnumSlug } from "../enums/role.enum";
import { IUser } from "../interfaces";
import roleModel from "../models/role.model";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";

export const defaultUser = async () => {
  const role_data: any = await roleModel.findOne({
    slug: RoleEnumSlug.SUPER_ADMIN_SLUG,
  });
  const pass: string = await bcrypt.hash("Password@123", 10);
  let existingUser: any;
  if (role_data) {
    existingUser = await userModel.findOne({
      role_id: new ObjectId(String(role_data._id)),
    });
  }
  if (!existingUser && existingUser !== undefined) {
    const userDoc: IUser = {
      name: "Admin",
      email: "admin@admin.com",
      password: pass,
      is_active: true,
      role_id: new ObjectId(String(role_data._id)),
    };

    await userModel.create(userDoc);
    console.log(`Default user created`);
  } else {
    console.log(`Default user already exists`);
  }
};
