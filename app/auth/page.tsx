import {getUser} from "@/lib/auth-server";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {unauthorized} from "next/navigation";
import {Check} from "lucide-react";

export default async function AuthPage() {
    const user = await getUser()

    if (!user) {
        return unauthorized();
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>User profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={"grid gap-2"}>
                        <div className={"flex flex-col"}>
                            <span className={"text-sm text-muted-foreground"}>Name</span>
                            <span>{user.name}</span>
                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"flex items-center gap-2"}>
                                <span className={"text-sm text-muted-foreground"}>Email</span>
                                {user.emailVerified ? <Check className={"size-3"}/> : null}
                            </div>
                            <span>{user.email}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}