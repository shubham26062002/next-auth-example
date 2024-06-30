"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { TbLoader2 } from "react-icons/tb"

import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUpFormSchema } from "@/lib/form-schemas"

export const SignUpForm = () => {
    const [type, setType] = useState<"password" | "text">("password")

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const isMutating = false

    const handleSubmit = form.handleSubmit((data) => {
        console.log(data)
    })

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <FormField control={form.control} name="name" render={({
                        field,
                    }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Jhon Doe" disabled={isMutating} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({
                        field,
                    }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="jhondoe@example.com" disabled={isMutating} {...field} />
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
                                    <Input type={type} placeholder="******" disabled={isMutating} {...field} />
                                    <button className="absolute top-1/2 -translate-y-1/2 right-3" type="button" disabled={isMutating} onClick={() => {
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
                <Button className="w-full" type="submit" disabled={isMutating}>

                    {isMutating ? (
                        <TbLoader2 className="animate-spin" />
                    ) :
                        "Continue"
                    }

                </Button>
            </form>
        </Form>
    )
}
