import { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import { signInFormSchema } from "@/lib/form-schemas"
import { getUserByEmail } from "@/lib/users-utils"

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validation = signInFormSchema.safeParse(credentials)

                if (validation.error) {
                    throw new Error(validation.error.message)
                }

                const { email, password } = validation.data

                const existingUser = await getUserByEmail(email)

                if (!existingUser || !existingUser.passwordHash) {
                    throw new Error("Email or password is invalid")
                }

                const isValidPassword = await bcrypt.compare(password, existingUser.passwordHash)

                if (!isValidPassword) {
                    throw new Error("Email or password is invalid")
                }

                return existingUser
            },
        })
    ],
} satisfies NextAuthConfig