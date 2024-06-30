"use client"

import { IconType } from "react-icons"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa6"
import { useTransition } from "react"
import { TbLoader2 } from "react-icons/tb"

import { Button } from "@/components/ui/button"
import { oauthSignIn } from "@/server-actions/oauth-sign-in"

export const OAuthButtons = () => {
    const oauthButtonsData: {
        icon: IconType,
        provider: "google" | "github"
    }[] = [
            {
                icon: FcGoogle,
                provider: "google"
            }, {
                icon: FaGithub,
                provider: "github"
            },
        ]

    const [isPending, startTransition] = useTransition()

    const handleClick = (provider: "google" | "github") => {
        startTransition(async () => {
            const response = await oauthSignIn(provider)
        })
    }

    return (
        <div className="flex gap-x-4">

            {oauthButtonsData.map((item, index) => (
                <Button key={index} className="text-xl flex-1" variant="outline" disabled={isPending} onClick={() => {
                    handleClick(item.provider)
                }}>

                    {isPending ? (
                        <TbLoader2 className="animate-spin" />
                    ) : (
                        <item.icon />
                    )}

                </Button>
            ))}

        </div>
    )
}
