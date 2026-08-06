import {ModeToggle} from "@/components/mode-toggle";
import Link from "next/link";
import {PageLayout} from "@/components/layout";
import {prisma} from "@/lib/prisma";
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";
import SelectStar from "@/app/(formation-layout)/courses/select-star";
import {EditTitle} from "@/app/(formation-layout)/courses/edit-title";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {revalidatePath} from "next/cache";
import {X} from "lucide-react";
import {ReviewFrom} from "@/app/review-form";

export default async function Home() {

    const reviews = await prisma.review.findMany()

    const changeStar = async (reviewId: string, star: number) => {
        "use server"
        await  prisma.review.update({
            where: {
                id: reviewId,
            },
            data: {
                star: star,
            }
        })

        revalidatePath("/")
    }

    const changeName = async (reviewId: string, name: string) => {
        "use server"

        await new Promise(resolve => setTimeout(resolve, 1000));

        await  prisma.review.update({
            where: {
                id: reviewId,
            },
            data: {
                name,
            }
        })

        revalidatePath("/")
    }

    return (
        <PageLayout>
            <h1>Learn next</h1>
            <Link href={'/formations'} className={'text-indigo-500 underline'}>
                Plan de formation
            </Link>
            <ModeToggle/>
            <div className={"flex flex-col gap-4"}>
                {reviews.map(review => (
                    <Card key={review.id} className="relative">
                        <div className="absolute right-4 top-4">
                            <form>
                                <Button formAction={async () => {
                                    "use server"
                                    await prisma.review.delete({
                                        where: {
                                            id: review.id,
                                        }
                                    })

                                    revalidatePath("/")
                                }} type={"submit"} size="sm" variant="outline"><X/></Button>
                            </form>
                        </div>
                        <CardHeader>
                            <SelectStar
                                star={review.star}
                                action={changeStar.bind(null, review.id)}
                            />
                            <EditTitle action={changeName.bind(null, review.id)} className={"text-lg font-bold"}>
                                {review.name}
                            </EditTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{review.review}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card className={"px-4"}>
                <ReviewFrom />
            </Card>
        </PageLayout>
    );
}
