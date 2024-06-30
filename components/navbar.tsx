"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const Navbar = () => {
    const navbarLinksData: {
        label: string,
        href: string,
    }[] = [
            {
                label: "Public",
                href: "/",
            }, {
                label: "Protected",
                href: "/protected",
            },
        ]

    const pathname = usePathname()

    return (
        <nav className="flex gap-x-4">

            {navbarLinksData.map((item, index) => (
                <Button key={index} className={cn(item.href === pathname && "bg-accent text-accent-foreground")} variant="ghost" size="sm" asChild>
                    <Link href={item.href}>{item.label}</Link>
                </Button>
            ))}

        </nav>
    )
}
