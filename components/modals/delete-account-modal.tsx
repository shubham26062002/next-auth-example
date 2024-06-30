"use client"

import useSWRMutation from "swr/mutation"
import { TbLoader2 } from "react-icons/tb"

import { client } from "@/lib/hono"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { useModal } from "@/zustand-hooks/use-modal"
import { Button } from "@/components/ui/button"

export const DeleteAccountModal = () => {
    const { isOpen, type, handleClose } = useModal()

    const { trigger, isMutating } = useSWRMutation("/api/users", async () => {
        const response = await client.api.users.$delete()

        const responseData = await response.json()

        return responseData
    })

    const handleClick = async () => {
        const response = await trigger()

        console.log(response)
    }

    return (
        <Dialog open={isOpen && type === "delete-account"} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete your account</DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground text-sm">Are you sure you want to delete your account? This action is irreversible.</p>
                <DialogFooter className="w-full flex flex-row justify-between sm:justify-between">
                    <DialogClose asChild>
                        <Button className="w-[4.763125rem]" variant="outline" disabled={isMutating}>

                            {isMutating ? (
                                <TbLoader2 className="animate-spin" />
                            ) :
                                "Cancel"
                            }

                        </Button>
                    </DialogClose>
                    <Button className="w-[7.775rem] bg-rose-600 hover:bg-rose-600/90" variant="destructive" disabled={isMutating} onClick={handleClick}>

                        {isMutating ? (
                            <TbLoader2 className="animate-spin" />
                        ) :
                            "Confirm delete"
                        }

                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
