import Link from "next/link"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OAuthButtons } from "@/components/oauth-buttons"
import { SignUpForm } from "@/components/forms/sign-up-form"

const SignUpPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <SignUpForm />
                <div className="flex items-center gap-x-4">
                    <p className="text-xs uppercase text-muted-foreground tracking-wide leading-none">Or use</p>
                    <div className="h-px flex-1 bg-border" />
                </div>
                <OAuthButtons />
            </CardContent>
            <CardFooter className="flex items-center justify-center">
                <Button className="h-fit p-0 rounded-none" variant="link" asChild>
                    <Link href="/sign-in">Already have an account?</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default SignUpPage