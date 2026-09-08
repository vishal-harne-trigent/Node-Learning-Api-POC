import { z } from "zod";
import {
    emailSchema,
    idParamSchema,
    nameSchema,
    phoneNumberSchema,
    userStatusSchema,
} from "../../common/validation/common.validation";

export const createUserSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phoneNumber: phoneNumberSchema,
    status: userStatusSchema.optional(),
});

export const updateUserSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phoneNumber: phoneNumberSchema,
    status: userStatusSchema.optional(),
});

export const patchUserSchema = z
    .object({
        name: nameSchema.optional(),
        email: emailSchema.optional(),
        phoneNumber: phoneNumberSchema,
        status: userStatusSchema.optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field is required to update",
    });

export const updateUserStatusSchema = z.object({
    status: userStatusSchema,
});

export { idParamSchema };
