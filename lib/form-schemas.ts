import * as z from "zod"

export const signUpFormSchema = z.object({
    name: z.string().refine((value) => value.trim() !== "", {
        message: "Name is required",
    }),
    email: z.string().email({
        message: "Email is invalid",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
})

export const signInFormSchema = z.object({
    email: z.string().email({
        message: "Email is invalid",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
})

export const resetPasswordFormSchema = z.object({
    oldPassword: z.string().min(1, {
        message: "Old password is required",
    }),
    newPassword: z.string().min(6, {
        message: "New password must be at least 6 characters long",
    }),
})

export const editProfileFormSchema = z.object({
    name: z.string().refine((value) => value.trim() !== "", {
        message: "Name is required",
    }),
    image: z.string(),
})