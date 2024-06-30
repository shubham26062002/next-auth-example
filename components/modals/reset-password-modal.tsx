"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useModal } from "@/zustand-hooks/use-modal"
import { ResetPasswordForm } from "@/components/forms/reset-password-form"

export const ResetPasswordModal = () => {
    const { isOpen, type, handleClose } = useModal()

    return (
        <Dialog open={isOpen && type === "reset-password"} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reset your password</DialogTitle>
                </DialogHeader>
                <ResetPasswordForm />
            </DialogContent>
        </Dialog>
    )
}
