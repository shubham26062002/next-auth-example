import Link from "next/link"

import { SignOutButton } from "@/components/sign-out-button"
import { LogoLink } from "@/components/logo-link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { auth } from "@/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Header = async () => {
    const session = await auth()

    return (
        <header className="w-full border-b">
            <div className="p-6 max-w-screen-xl mx-auto flex items-center justify-between">
                <LogoLink />
                <Navbar />
                <div className="flex items-center gap-x-6">

                    {session?.user ? (
                        <>
                            <Link href="/profile">
                                <Avatar>
                                    <AvatarImage src={session.user.image!} />
                                    <AvatarFallback>{session.user.email?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <Button size="sm" asChild>
                            <Link href="/sign-in">Sign in</Link>
                        </Button>
                    )}

                </div>
            </div >
        </header >
    )
}
