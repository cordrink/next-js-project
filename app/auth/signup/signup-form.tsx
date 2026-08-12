"use client"

import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {signUp} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const formSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
})

export const SignupForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const router = useRouter();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form values.
        console.log(data)

        await signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
            },
            {
                onSuccess: () => {
                    router.push("/auth");
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
                        name="name"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    aria-label={"name"}
                                    placeholder="Patrick"
                                    autoComplete="on"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />
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
