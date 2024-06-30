interface AuthLayoutProps {
    children: React.ReactNode,
}

const AuthLayoutProps = ({
    children,
}: AuthLayoutProps) => {
    return (
        <main className="h-full flex items-center justify-center p-6">
            <div className="w-full max-w-md">{children}</div>
        </main>
    )
}

export default AuthLayoutProps