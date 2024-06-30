"use client"

import { InferRequestType } from "hono"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TbLoader2 } from "react-icons/tb"
import "@uploadcare/react-uploader/core.css"
import { FileUploaderMinimal } from "@uploadcare/react-uploader"
import Image from "next/image"
import { useEffect } from "react"
import useSWRMutation from "swr/mutation"
import { toast } from "sonner"

import { client } from "@/lib/hono"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { editProfileFormSchema } from "@/lib/form-schemas"
import { SheetClose, SheetFooter } from "@/components/ui/sheet"
import { FaTrash } from "react-icons/fa6"
import { useSheet } from "@/zustand-hooks/use-sheet"

interface EditProfileFormProps {
    defaultValues: z.infer<typeof editProfileFormSchema>,
}

export const EditProfileForm = ({
    defaultValues,
}: EditProfileFormProps) => {
    const form = useForm<z.infer<typeof editProfileFormSchema>>({
        resolver: zodResolver(editProfileFormSchema),
        defaultValues: {
            name: "",
            image: "",
        },
    })

    useEffect(() => {
        form.setValue("name", defaultValues.name || "")

        form.setValue("image", defaultValues.image || "")
    }, [form, defaultValues.name, defaultValues.image])

    const { trigger, isMutating } = useSWRMutation("/api/users", async (_, {
        arg,
    }: {
        arg: InferRequestType<typeof client.api.users.$patch>["json"],
    }) => {
        const response = await client.api.users.$patch({
            json: arg,
        })

        const responseData = await response.json()

        return responseData
    })

    const { handleClose } = useSheet()

    const handleSubmit = form.handleSubmit(async (data) => {
        const response = await trigger(data)

        if ("error" in response) {
            toast.error(response.error)

            return
        }

        handleClose()

        toast.success("Profile updated successfully")
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
                                <Input placeholder="jhondoe@example.com" disabled={isMutating} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="image" render={({
                        field,
                    }) => (
                        <FormItem>
                            <FormLabel>Profile image</FormLabel>
                            <FormControl>

                                {form.watch("image") ? (
                                    <div className="mx-auto w-20 rounded-full aspect-square border relative">
                                        <Image className="object-cover rounded-full" src={form.watch("image")} alt="Profile image" fill quality={100} loading="eager" priority />
                                        <button className="text-white p-2 text-xs rounded-full absolute top-3 right-3 translate-x-1/2 -translate-y-1/2 bg-rose-600 transition disabled:opacity-50 disabled:pointer-events-none" disabled={isMutating} type="button" onClick={() => {
                                            form.setValue("image", "")
                                        }}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                ) : (
                                    <FileUploaderMinimal classNameUploader="my-config uc-dark" pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!} maxLocalFileSizeBytes={4000000} multiple={false} imgOnly={true} onChange={(event) => {
                                        const imageUrl = event.allEntries.find((item) => item.status === "success")?.cdnUrl

                                        form.setValue("image", imageUrl!)
                                    }} />
                                )}

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <SheetFooter className="flex flex-row sm:flex-row w-full gap-x-4">
                    <SheetClose asChild>
                        <Button className="flex-1" variant="outline" disabled={isMutating}>

                            {isMutating ? (
                                <TbLoader2 className="animate-spin" />
                            ) :
                                "Cancel"
                            }

                        </Button>
                    </SheetClose>
                    <Button className="flex-1" type="submit" disabled={isMutating}>

                        {isMutating ? (
                            <TbLoader2 className="animate-spin" />
                        ) :
                            "Save changes"
                        }

                    </Button>
                </SheetFooter>
            </form>
        </Form>
    )
}
