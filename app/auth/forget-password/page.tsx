"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function SignUpPage() {
    const router = useRouter();

    function onSubmit(formdata: FormData) {
        const email = formdata.get("email");

        authClient.requestPasswordReset({
                email: String(email), // required
                redirectTo: "reset-password",
            },
            {
                onSuccess: () => {
                    router.push("/auth");
                    router.refresh();
                },
                onError: error => {
                    toast.error(error.error.message);
                }
            }
        )
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>
                        Enter your email and password to sign in to your account.
                        If you've forgotten your password, you can reset it using the link below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className={"flex flex-col gap-4"} action={onSubmit}>
                        <div className={"space-y-2"}>
                            <label htmlFor="email">Email</label>
                            <Input type="email" id="email" aria-label="email" required/>
                        </div>
                        <Button type="submit">Reset Password</Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};
