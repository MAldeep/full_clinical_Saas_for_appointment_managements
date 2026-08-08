import { loginUser, registerUser } from "../services/auth.services.js";
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
  const { user, token } = await loginUser(email, password);
  res.status(200).json({
    success: true,
    token,
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
