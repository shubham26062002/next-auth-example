import Link from "next/link"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OAuthButtons } from "@/components/oauth-buttons"
import { SignInForm } from "@/components/forms/sign-in-form"
import { Suspense } from "react"
import { TbLoader2 } from "react-icons/tb"

const SignInPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <Suspense fallback={<LoadingSkeleton />}>
                    <SignInForm />
                </Suspense>
                <div className="flex items-center gap-x-4">
                    <p className="text-xs uppercase text-muted-foreground tracking-wide leading-none">Or use</p>
                    <div className="h-px flex-1 bg-border" />
                </div>
                <OAuthButtons />
            </CardContent>
            <CardFooter className="flex items-center justify-center">
                <Button className="h-fit p-0 rounded-none" variant="link" asChild>
                    <Link href="/sign-up">Don't have an account?</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default SignInPage

const LoadingSkeleton = () => {
    return (
        <div className="flex items-center justify-center text-xl text-muted-foreground">
            <TbLoader2 className="animate-spin" />
        </div>
    )
}