import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {VIDEOS} from "@/app/(formation-layout)/formations/data";

type PageProps = {
    params: Promise<{ videoId: string }>
}

export async function generateStaticParams() {
    const videos = VIDEOS;

    const result = videos.map((video) => ({
        videoId: video.id,
    }));

    console.log(result);

    return result;
}

export default async function Page({params}: PageProps) {
    const {videoId} = await params;

    const video = VIDEOS.find(video => video.id === videoId);
    return (
        <Card>
            <CardHeader>
                <CardTitle>{video?.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <ul className={"list-disc list-inside"}>
                    {video?.lessons.map(lesson => (
                        <li key={lesson.title}>
                            <Link href={`/formations/video/${video?.id}/lessons/${lesson.id}`}>{lesson.title}</Link>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Link href="/formations">Back</Link>
            </CardFooter>
        </Card>
    )
}
