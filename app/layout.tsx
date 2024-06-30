import { Metadata } from "next"
import { Outfit } from "next/font/google"

import { cn } from "@/lib/utils"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"

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
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false} disableTransitionOnChange>{children}</ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout