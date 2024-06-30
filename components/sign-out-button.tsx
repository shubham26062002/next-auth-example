"use client"

import { useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { signOut } from "@/server-actions/sign-out"
import { TbLoader2 } from "react-icons/tb"

export const SignOutButton = () => {
    const [isPending, startTransition] = useTransition()

    const handleClick = () => {
        startTransition(async () => {
            const response = await signOut()

            if (typeof response !== "undefined") {
                toast.error("Something went wrong")
            }
        })
    }

    return (
        <Button className="w-[4.6275rem]" size="sm" disabled={isPending} onClick={handleClick}>

            {isPending ? (
                <TbLoader2 className="animate-spin" />
            ) :
                "Sign out"
            }

        </Button>
    )
}
