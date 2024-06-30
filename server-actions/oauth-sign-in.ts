"use server"

import { signIn } from "@/auth"

export const oauthSignIn = async (provider: "google" | "github") => {
    return await signIn(provider, {
        redirectTo: "/",
    })
}