import { NextResponse } from "next/server"

import { auth } from "@/auth"

const authRoutes = [
    "/sign-in",
    "/sign-up",
    "/error",
]

const publicRoutes = [
    "/",
]

export default auth((request) => {
    const isSignedIn = !!request.auth

    const isApiRoute = request.nextUrl.pathname.startsWith("/api")

    if (isApiRoute) {
        return NextResponse.next()
    }

    const isAuthRoute = authRoutes.includes(request.nextUrl.pathname)

    if (isAuthRoute) {
        if (isSignedIn) {
            return NextResponse.redirect(new URL("/", request.nextUrl))
        }

        return NextResponse.next()
    }

    const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)

    if (!isPublicRoute && !isSignedIn) {
        return NextResponse.redirect(new URL("/sign-in", request.nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)",
        "/",
        "/(api|trpc)(.*)",
    ],
}