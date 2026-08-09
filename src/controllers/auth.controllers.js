import { env } from "../config/env.js";
import {
  loginUser,
  logoutUserService,
  refreshAccessTokenService,
  registerUser,
} from "../services/auth.services.js";
import catchAsync from "../utils/catchAsync.js";

export const registerUserCtrl = catchAsync(async (req, res, next) => {
  const userData = req.body;
  const newUser = await registerUser(userData);
  res.status(201).json({
    success: true,
    data: newUser,
  });
});

export const loginUserCtrl = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUser(email, password);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    accessToken,
    data: {
      user,
    },
  });
});

export const getMeCtrl = catchAsync(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
});

export const refreshTokenCtrl = catchAsync(async (req, res, next) => {
  const incomingRefreshToken = req.cookies?.refreshToken;
  const { accessToken, refreshToken } =
    await refreshAccessTokenService(incomingRefreshToken);
  res.cookie({
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({
    success: true,
    accessToken,
  });
});

export const logoutCtrl = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;

  await logoutUserService(refreshToken);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
