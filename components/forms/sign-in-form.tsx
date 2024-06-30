"use client"

import { redirect, useSearchParams } from "next/navigation"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { TbLoader2 } from "react-icons/tb"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signInFormSchema } from "@/lib/form-schemas"
import { signIn } from "@/server-actions/sign-in"

export const SignInForm = () => {
    const searchParams = useSearchParams()

    const error = searchParams.get("error")

    const oauthAccountNotLinkedError = error === "OAuthAccountNotLinked"

    if (oauthAccountNotLinkedError) {
        return redirect("/error")
    }

    const [type, setType] = useState<"password" | "text">("password")

    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const [isPending, startTransition] = useTransition()

    const handleSubmit = form.handleSubmit(async (data) => {
        startTransition(async () => {
            const response = await signIn(data)

            if (typeof response !== "undefined") {
                if (!response.success) {
                    toast.error(response.message)

                    return
                }
            }
        })
    })

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <FormField control={form.control} name="email" render={({
                        field,
                    }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="jhondoe@example.com" disabled={isPending} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="password" render={({
                        field,
                    }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input type={type} placeholder="******" disabled={isPending} {...field} />
                                    <button className="absolute top-1/2 -translate-y-1/2 right-3 disabled:opacity-50 disabled:pointer-events-none" type="button" disabled={isPending} onClick={() => {
                                        setType((previousType) => previousType === "password" ? "text" : "password")
                                    }}>

                                        {type === "password" ? (
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
                <Button className="w-full" type="submit" disabled={isPending}>

                    {isPending ? (
                        <TbLoader2 className="animate-spin" />
                    ) :
                        "Continue"
                    }

                </Button>
            </form>
        </Form>
    )
}
