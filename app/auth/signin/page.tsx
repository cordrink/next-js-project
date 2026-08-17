import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {SigninForm} from "@/app/auth/signin/signin-form";
import Link from "next/link";

export default function Signin() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <SigninForm/>
                </CardContent>
                <CardFooter>
                    <p className={"text-sm text-muted-foreground"}>
                        Don't have an account ?{" "}
                        <Link
                            href="/auth/signup"
                            className={"text-blue-600 hover:underline"}
                        >Sign up</Link>
                    </p>
                </CardFooter>
            </Card>
        </>
    );
}