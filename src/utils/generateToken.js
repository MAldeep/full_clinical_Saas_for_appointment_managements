import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export const generateToken = (id) => {
  const accessToken = jwt.sign({ id }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN || "15m",
  });
  const refreshToken = jwt.sign({ id }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN || "7d",
  });
  return { accessToken, refreshToken };
};
