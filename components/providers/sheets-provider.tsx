"use client"

import { useState, useEffect } from "react"

import { EditProfileSheet } from "@/components/sheets/edit-profile-sheet"

export const SheetsProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [setIsMounted])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <EditProfileSheet />
        </>
    )
}
