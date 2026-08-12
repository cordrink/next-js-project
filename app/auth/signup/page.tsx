import {PageLayout} from "@/components/layout";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {SignupForm} from "@/app/auth/signup/signup-form";

export default function SignUpPage() {
    return (
        <PageLayout>
            <Card >
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <SignupForm />
                </CardContent>
            </Card>
        </PageLayout>
    );
};
