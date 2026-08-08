import { getAllDoctors } from "../services/doctors.services.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllDoctorsCtrl = catchAsync(async (req, res, next) => {
  const doctors = await getAllDoctors();

  res.status(200).json({
    success: true,
    data: doctors,
  });
});
