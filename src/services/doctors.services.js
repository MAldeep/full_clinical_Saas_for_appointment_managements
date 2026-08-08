import { User } from "../models/user.model.js";

export const getAllDoctors = async () => {
  return await User.find({ role: "Doctor" }).select("name email _id");
};
