"use client"

import { InferRequestType } from "hono"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { useState } from "react"
import { TbLoader2 } from "react-icons/tb"
import useSWRMutation from "swr/mutation"
import { toast } from "sonner"

import { client } from "@/lib/hono"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { resetPasswordFormSchema } from "@/lib/form-schemas"
import { DialogFooter, DialogClose } from "@/components/ui/dialog"
import { useModal } from "@/zustand-hooks/use-modal"
import { signOut } from "@/server-actions/sign-out"

export const ResetPasswordForm = () => {
    const { handleClose } = useModal()

    const [oldPasswordType, setOldPasswordType] = useState<"password" | "text">("password")

    const [newPasswordType, setNewPasswordType] = useState<"password" | "text">("password")

    const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
    })

    const { trigger, isMutating } = useSWRMutation("/api/users/reset-password", async (_, {
        arg,
    }: {
        arg: InferRequestType<typeof client.api.users["reset-password"]["$patch"]>["json"],
    }) => {
        const response = await client.api.users["reset-password"]["$patch"]({
            json: arg,
        })

        const responseData = await response.json()

        return responseData
    })

    const handleSubmit = form.handleSubmit(async (data) => {
        const response = await trigger(data)

        if ("error" in response) {
            toast.error(response.error)

            return
        }

        toast.success("Password reset successfully")

        handleClose()

        const signOutResponse = await signOut()

        if (typeof signOutResponse !== "undefined") {
            toast.error("Something went wrong")

            return
        }
    })

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <FormField control={form.control} name="oldPassword" render={({
                        field,
                    }) => (
                        <FormItem>
                            <FormLabel>Old password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input type={oldPasswordType} placeholder="******" disabled={isMutating} {...field} />
                                    <button className="absolute top-1/2 -translate-y-1/2 right-3 disabled:opacity-50 disabled:pointer-events-none" type="button" disabled={isMutating} onClick={() => {
                                        setOldPasswordType((previousOldPasswordType) => previousOldPasswordType === "password" ? "text" : "password")
                                    }}>

                                        {oldPasswordType === "password" ? (
                                            <VscEyeClosed />
                                        ) : (
                                            <VscEye />
                                        )}

                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="newPassword" render={({
                        field,
                    }) => (
                        <FormItem>
                            <FormLabel>New password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input type={newPasswordType} placeholder="******" disabled={isMutating} {...field} />
                                    <button className="absolute top-1/2 -translate-y-1/2 right-3 disabled:opacity-50 disabled:pointer-events-none" type="button" disabled={isMutating} onClick={() => {
                                        setNewPasswordType((previousNewPasswordType) => previousNewPasswordType === "password" ? "text" : "password")
                                    }}>

                                        {newPasswordType === "password" ? (
                                            <VscEyeClosed />
                                        ) : (
                                            <VscEye />
                                        )}

                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <DialogFooter className="w-full flex flex-row items-center justify-between sm:justify-between">
                    <DialogClose asChild>
                        <Button className="w-[4.763125rem]" variant="outline" disabled={isMutating}>

                            {isMutating ? (
                                <TbLoader2 className="animate-spin" />
                            ) :
                                "Cancel"
                            }

                        </Button>
                    </DialogClose>
                    <Button className="w-[5.4925rem]" type="submit" disabled={isMutating}>

                        {isMutating ? (
                            <TbLoader2 className="animate-spin" />
                        ) :
                            "Continue"
                        }

                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
