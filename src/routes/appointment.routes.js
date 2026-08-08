import express from "express";
import { protect } from "../middlewares/protect.js";
import { restrictTo } from "../middlewares/restrictTo.js";
import {
  createAppointmentCtrl,
  deleteAppointmentCtrl,
  getAllAppointmentsCtrl,
  getAppointmentByIdCtrl,
  updateAppointmentCtrl,
} from "../controllers/appointment.controllers.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  // Staff,  admin or doctor can get all appointment
  // for admin adn staff gets all, for doctor get his appointments
  .get(restrictTo("Admin", "Doctor", "Staff"), getAllAppointmentsCtrl)
  // Only Admin or Staff can create new Appointment
  .post(restrictTo("Admin", "Staff"), createAppointmentCtrl);

router
  .route("/:id")
  // all can get by id
  // doctor can get only if it's his appointment
  .get(restrictTo("Admin", "Doctor", "Staff"), getAppointmentByIdCtrl)
  // only Admin or staff can update
  .patch(restrictTo("Admin", "Staff"), updateAppointmentCtrl)
  // only admin can delete appointment
  .delete(restrictTo("Admin"), deleteAppointmentCtrl);

export default router;
