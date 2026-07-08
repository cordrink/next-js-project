import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {PageLayout} from "@/components/layout";
import {VIDEOS} from "@/app/formations/data";

type PageProps = {
    params: Promise<{ videoId: string }>
}

export default async function Page({params}: PageProps) {
    const {videoId} = await params;

    const video = VIDEOS.find(video => video.id === videoId);
    return (
        <PageLayout>
            <Card>
                <CardHeader>
                    <CardTitle>{video?.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <ul className={"list-disc list-inside"}>
                        {video?.lessons.map(lesson => (
                            <li key={lesson.title}>{lesson.title}</li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Link href="/formations">Back</Link>
                </CardFooter>
            </Card>
        </PageLayout>
    )
}
