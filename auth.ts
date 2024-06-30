import NextAuth, { DefaultSession } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

import { db } from "@/drizzle/db"
import authConfig from "@/auth.config"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
        } & DefaultSession["user"]
    }
}

export const {
    auth,
    handlers,
    signIn,
    signOut,
} = NextAuth({
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
    ...authConfig,
})