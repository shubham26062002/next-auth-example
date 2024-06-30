"use client"

import Link from "next/link"
import { MdErrorOutline } from "react-icons/md"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const GlobalErrorPage = () => {
    return (
        <main className="h-full flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>An error occurred</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 flex items-center gap-x-4 text-sm bg-rose-600/40 border border-rose-600">
                            <MdErrorOutline className="flex-shrink-0 text-2xl" />
                            <p>Something went wrong. Please try again later.</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-center">
                        <Button className="h-fit p-0 rounded-none" variant="link" asChild>
                            <Link href="/">Go back</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    )
}

export default GlobalErrorPage