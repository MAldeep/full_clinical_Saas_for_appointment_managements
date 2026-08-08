import express from "express";
import { protect } from "../middlewares/protect.js";
import { restrictTo } from "../middlewares/restrictTo.js";
import { getAllDoctorsCtrl } from "../controllers/doctors.controllers.js";

const router = express.Router();

router.use(protect);
router.route("/").get(restrictTo("Admin", "Staff"), getAllDoctorsCtrl);
