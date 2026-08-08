import express from "express";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import {
  loginUserCtrl,
  registerUserCtrl,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.route("/register").post(validate(registerSchema), registerUserCtrl);

router.route("/login").post(validate(loginSchema), loginUserCtrl);

export default router;
