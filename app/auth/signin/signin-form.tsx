"use client"

import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {signIn} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const formSchema = z.object({
    email: z.email(),
    password: z.string(),
})

export const SigninForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const router = useRouter();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form values.
        console.log(data)

        await signIn.email({
                email: data.email,
                password: data.password,
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
        <Card className="w-full px-2">
            <CardContent>
                <form className={"flex flex-col gap-6"} id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Email
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    aria-label={"email"}
                                    placeholder="example@gmail.com"
                                    type={"email"}
                                    autoComplete="on"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="password"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    password
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    aria-label={"password"}
                                    placeholder="Password"
                                    type={"password"}
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />
                </form>
            </CardContent>
            <Button type="submit" form="form-rhf-demo">
                Submit
            </Button>
        </Card>
    )
};
