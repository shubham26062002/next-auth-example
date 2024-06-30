"use client"

import { useSession } from "next-auth/react"
import { IoChevronDownOutline } from "react-icons/io5"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { FaKey, FaTrash, FaUser } from "react-icons/fa6"
import { useModal } from "@/zustand-hooks/use-modal"
import { useSheet } from "@/zustand-hooks/use-sheet"

interface ProfileDropdownMenuProps {
    showResetPassword: boolean,
}

export const ProfileDropdownMenu = ({
    showResetPassword,
}: ProfileDropdownMenuProps) => {
    const { handleOpen } = useModal()

    const { handleOpen: handleOpenSheet } = useSheet()

    const session = useSession()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" variant="outline">
                    <p>Manage your profile</p>
                    <IoChevronDownOutline />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[20rem]">
                <DropdownMenuItem className="gap-x-2 text-indigo-600 focus:text-indigo-600 cursor-pointer" onClick={() => {
                    handleOpenSheet("edit-profile", {
                        name: session.data?.user.name!,
                        image: session.data?.user.image!,
                    })
                }}>
                    <FaUser />
                    <p>Edit your profile</p>
                </DropdownMenuItem>

                {showResetPassword && (
                    <DropdownMenuItem className="gap-x-2 text-indigo-600 focus:text-indigo-600 cursor-pointer" onClick={() => {
                        handleOpen("reset-password")
                    }}>
                        <FaKey />
                        <p>Reset your password</p>
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-x-2 text-rose-600 focus:text-rose-600 cursor-pointer" onClick={() => {
                    handleOpen("delete-account")
                }}>
                    <FaTrash />
                    <p>Delete your account</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
