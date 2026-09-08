import { z } from "zod";
import {
    emailSchema,
    nameSchema,
    passwordSchema,
    phoneNumberSchema,
} from "../../common/validation/common.validation";

export const registerSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    phoneNumber: phoneNumberSchema,
});

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string({ message: "Password is required" }).min(1, "Password is required"),
});
