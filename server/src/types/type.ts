import { z } from 'zod';
import type { JwtPayload } from "jsonwebtoken";
import { CATEGORIES } from "./category.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

/* Authentication */
const strictEmailRegex = /^[a-zA-Z0-9.!#$%&'*\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;

export const sendOtpSchema = z.object({
  email: z.email("Invalid email address")
});

export const verifyOtpSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits")
});

export const completeRegistrationSchema = z.object({
  password: z.string().min(8, "Password must be at least8 characters"),
  name: z.string().min(2, "Name contain min 2 characters")
});

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters")
});


/* Post */
export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().optional(),
  post_picture: z.url().optional(),
  post_picture_id: z.string().optional(),
  category: z.enum(CATEGORIES),
  tags: z.array(z.string()).max(5).optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});



/* Typescript types (inferred from zod schemas) */
export type SendOtpInput = z.infer<typeof sendOtpSchema>
export type VerifyOTPInput = z.infer<typeof verifyOtpSchema>
export type CompleteRegistrationInput = z.infer<typeof completeRegistrationSchema>
export type SignInInput = z.infer<typeof signInSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export type CreatePostInput = z.infer<typeof createPostSchema>;

export const APPS = ["Blog"] as const; // For now, just one app
export const ENTITIES = ["user", "post"] as const;
export const PURPOSES = [
  "profile-picture",
  "cover-picture", 
  "post-picture"
] as const;

type App = typeof APPS[number];
type Entity = typeof ENTITIES[number];
type Purpose = typeof PURPOSES[number];

export type UploaderOptions = {
  app: App;
  entity: Entity;
  purpose: Purpose;
}

export type UserTokenPayLoad = {
  user_id: number;
  email: string;
  name: string
}