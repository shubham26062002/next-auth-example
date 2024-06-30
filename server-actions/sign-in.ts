"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { signIn as authSignIn } from "@/auth"
import { getUserByEmail } from "@/lib/users-utils"
import { signInFormSchema } from "@/lib/form-schemas"

export const signIn = async (data: z.infer<typeof signInFormSchema>) => {
    const validation = signInFormSchema.safeParse(data)

    if (validation.error) {
        return {
            success: false,
            data: null,
            message: validation.error.message,
        }
    }

    const { email, password } = validation.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.passwordHash) {
        return {
            success: false,
            data: null,
            message: "Email or password is invalid",
        }
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.passwordHash)

    if (!isValidPassword) {
        return {
            success: false,
            data: null,
            message: "Email or password is invalid",
        }
    }

    return await authSignIn("credentials", {
        email,
        password,
        redirectTo: "/",
    })
}