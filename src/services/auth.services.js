import { User } from "../models/user.model.js";
import AppError from "../utils/appError.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError("User with this email is already exists", 400);
  }
  const newUser = await User.create(userData);
  newUser.password = undefined;
  return newUser;
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password", 401);
  }
  const { accessToken, refreshToken } = generateToken(user._id);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  user.password = undefined;
  return { user, accessToken, refreshToken };
};
