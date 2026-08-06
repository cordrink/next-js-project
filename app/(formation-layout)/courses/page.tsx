import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {userAgent} from "next/server";
import {headers} from "next/headers";
import {prisma} from "@/lib/prisma";
import SelectStar from "@/app/(formation-layout)/courses/select-star";
import {revalidatePath} from "next/cache";
import {EditTitle} from "@/app/(formation-layout)/courses/edit-title";


export default async function Page() {
    const userAgentList = userAgent({
        headers: await headers(),
    });

    const reviews = await prisma.review.findMany()

    const setNewStar = async (reviewId: string, star: number): Promise<void> => {
        "use server"
        await prisma.review.update({
            where: {
                id: reviewId,
            },
            data: {
                star,
            }
        })
        revalidatePath("/courses")
    }

    const setName = async (reviewId: string, name: string): Promise<void> => {
        "use server"
        await prisma.review.update({
            where: {
                id: reviewId,
            },
            data: {
                name: name,
            }
        })
        revalidatePath("/courses")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Courses !</CardTitle>
                <CardDescription>{userAgentList.browser.name}</CardDescription>
            </CardHeader>
            <CardContent>
                {reviews.map(review => (
                    <Card key={review.id}>
                        <CardHeader>
                            <SelectStar star={review.star} action={setNewStar.bind(null, review.id)}/>
                            <EditTitle action={setName.bind(null, review.id)}>{review.name}</EditTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{review.review}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}
