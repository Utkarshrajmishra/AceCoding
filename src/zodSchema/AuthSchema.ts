import {z} from "zod";

export const AuthScehma = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid Email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be more than 5 characters").min(1,"Password is required"),
});