"use server"

import { signOut as authSignOut } from "@/auth"

export const signOut = async () => {
    return await authSignOut({
        redirectTo: "/sign-in",
    })
}