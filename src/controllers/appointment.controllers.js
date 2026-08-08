import {
  createAppointmentService,
  deleteAppointmentService,
  getAllAppointmentsService,
  getAppointmentByIdService,
  updateAppointmentService,
} from "../services/appointment.services.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const createAppointmentCtrl = catchAsync(async (req, res, next) => {
  const appointmentData = req.body;
  const newAppointment = await createAppointmentService(appointmentData);

  res.status(201).json({
    success: true,
    data: newAppointment,
  });
});

export const getAllAppointmentsCtrl = catchAsync(async (req, res, next) => {
  const filter = req.user.role === "Doctor" ? { doctor: req.user._id } : {};

  const appointments = await getAllAppointmentsService(filter);

  res.status(200).json({
    success: true,
    results: appointments.length,
    data: appointments,
  });
});

export const getAppointmentByIdCtrl = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await getAppointmentByIdService(id);

  if (!appointment) {
    return next(new AppError("Appointment not found", 404));
  }

  const isOwner = appointment.doctor._id.toString() === req.user._id.toString();

  if (req.user.role === "Doctor" && !isOwner) {
    return next(
      new AppError(
        "You do not have permission to access this appointment",
        403,
      ),
    );
  }

  res.status(200).json({
    success: true,
    data: appointment,
  });
});

export const updateAppointmentCtrl = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedAppointment = await updateAppointmentService(id, req.body);

  if (!updatedAppointment) {
    return next(new AppError("Appointment not found", 404));
  }

  res.status(200).json({
    success: true,
    data: updatedAppointment,
  });
});
export const deleteAppointmentCtrl = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedAppointment = await deleteAppointmentService(id);

  if (!deletedAppointment) {
    return next(new AppError("Appointment not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Appointment deleted successfully",
  });
});
