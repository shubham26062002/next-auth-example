import Link from "next/link"
import { MdErrorOutline } from "react-icons/md"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ErrorPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Provider conflict error</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="p-4 flex items-center gap-x-4 text-sm bg-destructive/40 border border-destructive">
                    <MdErrorOutline className="flex-shrink-0 text-2xl" />
                    <p>Using a different provider than the one you used to create your account is not allowed.</p>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
                <Button className="h-fit p-0 rounded-none" variant="link" asChild>
                    <Link href="/sign-in">Back to sign in</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ErrorPage