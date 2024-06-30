const ProtectedPage = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-md flex flex-col gap-y-6">
                <h1 className="text-4xl text-center tracking-tight leading-none font-semibold">Protected page</h1>
                <p className="text-center text-muted-foreground text-lg">You must be signed in to access this page, and if you're seeing this page, that means you are signed in.</p>
            </div>
        </div>
    )
}

export default ProtectedPage