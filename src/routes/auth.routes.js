import express from "express";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import {
  getMeCtrl,
  loginUserCtrl,
  registerUserCtrl,
} from "../controllers/auth.controllers.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

router.route("/register").post(validate(registerSchema), registerUserCtrl);

router.route("/login").post(validate(loginSchema), loginUserCtrl);
router.route("/me").get(protect, getMeCtrl);
export default router;
