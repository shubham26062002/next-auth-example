import { IoChevronDownOutline } from "react-icons/io5"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { FaKey, FaTrash, FaUser } from "react-icons/fa6"

export const ProfileDropdownMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" variant="outline">
                    <p>Manage your profile</p>
                    <IoChevronDownOutline />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[20rem]">
                <DropdownMenuItem className="gap-x-2 text-indigo-600 focus:text-indigo-600 cursor-pointer">
                    <FaUser />
                    <p>Edit your profile</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-x-2 text-indigo-600 focus:text-indigo-600 cursor-pointer">
                    <FaKey />
                    <p>Reset your password</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-x-2 text-rose-600 focus:text-rose-600 cursor-pointer">
                    <FaTrash />
                    <p>Delete your account</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
