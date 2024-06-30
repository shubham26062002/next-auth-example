import { Hono } from "hono"
import { handle } from "hono/vercel"
import { authHandler, initAuthConfig, AuthConfig } from "@hono/auth-js"
import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"
import Credentials from "@auth/core/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import bcrypt from "bcryptjs"

import { getUserById } from "@/lib/users-utils"
import { signInFormSchema } from "@/lib/form-schemas"
import { getUserByEmail } from "@/lib/users-utils"
import { db } from "@/drizzle/db"
import users from "@/app/api/[[...route]]/users"

const app = new Hono().basePath("/api")

app
    .use("*", initAuthConfig((): AuthConfig => ({
        adapter: DrizzleAdapter(db),
        secret: process.env.AUTH_SECRET,
        session: {
            strategy: "jwt",
        },
        debug: process.env.NODE_ENV !== "production",
        pages: {
            signIn: "/sign-in",
            error: "/error",
        },
        callbacks: {
            async session({ session, token }) {
                if (session.user && token.sub) {
                    session.user.id = token.sub
                }

                return session
            }
        },
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
    })))
    .use("/auth/*", authHandler())

const routes = app
    .route("/users", users)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes