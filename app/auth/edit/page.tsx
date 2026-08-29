import {getUser} from "@/lib/auth-server";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {unauthorized} from "next/navigation";
import {AccountForm} from "@/app/auth/edit/account-form";

export default async function AuthPage() {
    const user = await getUser()

    if (!user) {
        return unauthorized();
    }

    return (
        <>
            <Card>
                <CardHeader className="flex items-center gap-2">
                    <CardTitle>Edit Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <AccountForm defaultValues={{name: user.name, image: user.image}}/>
                </CardContent>
            </Card>
        </>
    )
}