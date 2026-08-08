import { Appointment } from "../models/appoitment.model.js";

export const createAppointmentService = async (appointmentData) => {
  const newAppointment = await Appointment.create(appointmentData);
  return newAppointment;
};

export const getAllAppointmentsService = async (filter) => {
  const appointments = await Appointment.find(filter)
    .populate("doctor", "name email role")
    .populate("createdBy", "name role");
  return appointments;
};

export const getAppointmentByIdService = async (id) => {
  const appoitment = await Appointment.findById(id).populate(
    "doctor",
    "name email role",
  );
  if (!appoitment) return null;
  return appoitment;
};

export const updateAppointmentService = async (id, updateData) => {
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );
  return updatedAppointment;
};

export const deleteAppointmentService = async (id) => {
  const deletedAppointment = await Appointment.findByIdAndDelete(id);
  return deletedAppointment;
};
