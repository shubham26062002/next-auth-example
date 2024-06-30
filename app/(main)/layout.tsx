import { Header } from "@/components/header"

interface MainLayoutProps {
    children: React.ReactNode,
}

const MainLayout = ({
    children,
}: MainLayoutProps) => {
    return (
        <div className="h-full flex flex-col">
            <Header />
            <main className="flex-1">
                <div className="p-6 max-w-screen-xl mx-auto h-full">{children}</div>
            </main>
        </div>
    )
}

export default MainLayout