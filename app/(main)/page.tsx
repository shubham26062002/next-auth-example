const HomePage = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-y-6">
        <h1 className="text-4xl text-center tracking-tight leading-none font-semibold">Public page</h1>
        <p className="text-center text-slate-500 text-lg">Anyone can access this page.</p>
      </div>
    </div>
  )
}

export default HomePage