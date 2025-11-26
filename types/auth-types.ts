import { z } from "zod";
import { loginSchema } from "@/schemas/auth-schema";

export type LoginFormValues = z.infer<typeof loginSchema>;