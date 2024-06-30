import { auth } from "@/auth"
import { ProfileDropdownMenu } from "@/components/profile-dropdown-menu"

const ProfilePage = async () => {
    const session = await auth()

    return (
        <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-md flex flex-col gap-y-6">
                <h1 className="text-4xl text-center tracking-tight leading-none font-semibold">Welcome, {session?.user.name}</h1>
                <div className="max-w-xs mx-auto w-full">
                    <ProfileDropdownMenu showResetPassword={session?.user.hasPassword!} />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage