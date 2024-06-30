"use client"

import { useSheet } from "@/zustand-hooks/use-sheet"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { EditProfileForm } from "@/components/forms/edit-profile-form"

export const EditProfileSheet = () => {
    const { isOpen, type, data, handleClose } = useSheet()

    return (
        <Sheet open={isOpen && type === "edit-profile"} onOpenChange={handleClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit your profile</SheetTitle>
                </SheetHeader>
                <EditProfileForm defaultValues={{
                    name: data?.name!,
                    image: data?.image!,
                }} />
            </SheetContent>
        </Sheet>
    )
}
