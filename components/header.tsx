import Link from "next/link";
import {getUser} from "@/lib/auth-server";
import {Button, buttonVariants} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {LogOut, User2} from "lucide-react";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export const Header = () => {
    return (
        <header className="flex items-center gap-4 px-4 py-2 border-b max-w-md mx-auto border-x">
            <Link href="/">App</Link>
            <div className={"flex-1"}></div>
            <Suspense fallback={<Skeleton className={"h-10 w-20"}/>}>
                <AuthButton/>
            </Suspense>
        </header>
    )
}

export const AuthButton = async () => {
    const user = await getUser();

    if (!user) {
        return (
            <Link href="/auth/signin" className={buttonVariants({size: "sm", variant: "outline"})}>Sign In</Link>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
                <Avatar className={"size-6"}>
                    <AvatarImage alt={"Initial"} />
                    <AvatarFallback >{user.email[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <p>{user.name}</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuItem render={
                    <Link href={"/auth"} className={"flex items-center gap-2"}>
                        <User2 className={"size-3"} />
                        Account
                    </Link>
                }/>
                <DropdownMenuItem render={
                    <form>
                        <button className={"flex items-center gap-2 w-full"} formAction={async () => {
                            "use server"

                            await auth.api.signOut({
                                headers: await headers(),
                            })

                            redirect("/auth/signin");
                        }}>
                            <LogOut className={"size-4"}/>
                            Logout
                        </button>
                    </form>
                } />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}