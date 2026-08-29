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
import {authClient, signIn} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {GitGraph} from "lucide-react";

const formSchema = z.object({
    name: z.string(),
    image: z.string().nullable().optional(),
})

export const AccountForm = (props: {defaultValues: z.infer<typeof formSchema>}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: props.defaultValues,
    })

    const router = useRouter();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form values.
        console.log(data)

        await authClient.updateUser({
                name: data.name,
                image: data.image,
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

    const signInWithProvider = async (provider: string) => {
        await signIn.social({
                provider: provider,
                callbackURL: "/auth",
            },
            {
                onSuccess: () => {},
                onError: error => {
                    toast.error(error.error.message);
                }
            }
        )
    }

    return (
        <Card className="w-full px-2">
            <CardContent className="flex items-center flex-col gap-8">
                <form className={"flex flex-col gap-6 w-full"} id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    aria-label={"email"}
                                    placeholder="example@gmail.com"
                                    autoComplete="on"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="image"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Image URL
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    aria-label={"password"}
                                    placeholder="Password"
                                    value={field.value ?? ""}
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />
                    <Button type="submit" form="form-rhf-demo">
                        Submit
                    </Button>
                </form>
                <p className={"text-sm text-muted-foreground"}>OR</p>
                <div className="flex w-full gap-4">
                    <Button onClick={()=> signInWithProvider("github")} className="flex-1" variant="outline">
                        <GitGraph />
                        Sign in with Github
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
};
