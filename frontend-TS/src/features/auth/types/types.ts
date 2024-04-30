import { ZodType } from "zod";
import { z } from "zod";

export type User = {
  id:number;
  mail:string;
  name: string;
  password: string;
  createdAt: string;
}

export type UserResponse = {
  sub:number;
  name:string;
  iat:number;
  access_token: string;
  exp:number;
  user:User;
}

export type RegisterFormData = {
  name: string;
  mail: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormData = {
  mail: string;
  password: string;
};

export const UserSchema: ZodType<RegisterFormData> = z
  .object({
    mail: z.string({
      required_error:"email is required",
      invalid_type_error:"Email must be a string"

    }).email(),
    name: z.string({
      required_error:"Name is required",
      invalid_type_error:"Name must be a string"
    }),
    password: z
      .string()
      .min(8, { message: "Password is too short" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export const LoginSchema: ZodType<LoginFormData> = z
  .object({
    mail: z.string({
      required_error:"email is required",
      invalid_type_error:"Email must be a string"
    }).email(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
  });