import type { ChangeEvent } from "react";

export type LabeledInputType = {
  label: string;
  placeholder: string;
  type?: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type BlogCardProps = {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
};

/*  */
export type User = {
  user_id: number;
  email: string;
  name: string;
}

/* signup.tsx useAuth.ts */
export type SendOTPInput = {
  email: string;
};
export type OTPInput = {
  otp: string;
};
export type SignupInput = {
  password: string;
  name: string;
};

/* Signin.tsx useAuth.ts */
export type LoginInput = {
  email: string;
  password: string;
};
