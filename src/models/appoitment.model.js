import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    // 👈 الربط مع موديل المستخدم (الدكتور)
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // لازم يكون نفس الاسم اللي سجلت بيه الموديل بتاع User
      required: [true, "Appointment must belong to a doctor"],
    },
    date: {
      type: Date,
      required: [true, "Appointment date is required"],
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true },
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
