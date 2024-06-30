"use server"

export const oauthSignIn = async (provider: "google" | "github") => {
    await new Promise(resolve => setTimeout(resolve, 5000))

    console.log(provider)
}