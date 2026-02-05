import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .regex(/^\S+$/, "Name cannot contain spaces")
  .min(2, "Name must be at least 2 characters")
  .max(16, "Name must be less than 16 characters");

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Please enter a valid email address");

const registerPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
  .max(64, "Password must be less than 64 characters");

const loginPasswordSchema = z.string().min(1, "Password is required");

export const loginSchema = z.object({
  identifier: emailSchema.or(nameSchema),
  password: loginPasswordSchema,
});

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: registerPasswordSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
