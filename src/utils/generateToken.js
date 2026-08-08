import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export const generateToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN || "90d",
  });
};
