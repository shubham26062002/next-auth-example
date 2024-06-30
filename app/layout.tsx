import { Metadata } from "next"
import { Outfit } from "next/font/google"

import { cn } from "@/lib/utils"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { ModalsProvider } from "@/components/providers/modals-provider"
import { SheetsProvider } from "@/components/providers/sheets-provider"
import { SessionProvider } from "next-auth/react"

const outfit = Outfit({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Next Auth Example",
}

interface RootLayoutProps {
  children: React.ReactNode,
}

const RootLayout = ({
  children,
}: RootLayoutProps) => {
  return (
    <html className="h-full antialiased" lang="en" suppressHydrationWarning>
      <body className={cn("h-full", outfit.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SessionProvider>
            <Toaster position="bottom-center" />
            <ModalsProvider />
            <SheetsProvider />
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout