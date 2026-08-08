import z from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).trim().min(2),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("Invalid email"),
    phone: z.string().optional(),
    password: z.string().min(6, "At least 6 chars"),
    role: z.enum(["Doctor", "Staff", "Admin"]).optional(),
  }),
});
export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email Is Required" }).email().trim(),
    password: z.string().min(6, "At least 6 chars"),
  }),
});
