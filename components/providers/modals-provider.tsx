"use client"

import { useState, useEffect } from "react"

import { ResetPasswordModal } from "@/components/modals/reset-password-modal"
import { DeleteAccountModal } from "@/components/modals/delete-account-modal"

export const ModalsProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [setIsMounted])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <ResetPasswordModal />
            <DeleteAccountModal />
        </>
    )
}
