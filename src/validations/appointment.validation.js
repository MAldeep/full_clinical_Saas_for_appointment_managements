import z from "zod";

export const createAppointmentSchema = z.object({
  body: z.object({
    patientName: z
      .string({ required_error: "patient's name must be provided" })
      .min(3, "At least 3 chars"),
    doctor: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Doctor ID"),
    date: z
      .string()
      .datetime()
      .refine(
        (val) => {
          const inputDate = new Date(val);
          const now = new Date();

          now.setHours(0, 0, 0, 0);

          return inputDate >= now;
        },
        {
          message: "Date can't be in the past",
        },
      ),
    status: z.enum(["scheduled", "completed", "cancelled"]).optional(),
  }),
});

export const updateAppointmentSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Doctor ID"),
  }),
  body: z.object({
    patientName: z.string().min(3, "At least 3 chars").optional(),
    date: z
      .string()
      .datetime()
      .refine(
        (val) => {
          const inputDate = new Date(val);
          const now = new Date();

          now.setHours(0, 0, 0, 0);

          return inputDate >= now;
        },
        {
          message: "Date can't be in the past",
        },
      )
      .optional(),
    status: z.enum(["scheduled", "completed", "cancelled"]).optional(),
  }),
});

export const getOrDeleteAppointmentParamsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Doctor ID"),
  }),
});
