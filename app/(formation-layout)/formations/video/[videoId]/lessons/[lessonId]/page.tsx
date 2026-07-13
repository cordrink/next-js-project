import type { Metadata } from 'next';
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {VIDEOS} from "@/app/(formation-layout)/formations/data";
import {notFound} from "next/navigation";

export async function generateStaticParams() {
    const videos = VIDEOS;

    const result = videos.flatMap((video) => {
        const params = video.lessons.map((lesson) => ({
            videoId: video.id,
            lessonId: lesson.id,
        }))
        return params;
    });

    console.log(result);

    return result;
}

type PageProps = {
    params: Promise<{ videoId: string, lessonId: string }>
}

export const generateMetadata = async ({params}: PageProps): Promise<Metadata> => {
    const {videoId} = await params;

    const video = VIDEOS.find(video => video.id === videoId);

    return {
        title: `video • ${video?.title}`,
    }


}

export default async function Page({params}: PageProps) {
    const {videoId, lessonId} = await params;

    const video = VIDEOS.find(video => video.id === videoId);

    const lesson = video?.lessons.find(lesson => lesson.id === lessonId)


    if (!lesson) {
        notFound();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>

            <CardFooter>
                <Link href={`/formations/video/${video?.id}`}>Back</Link>
            </CardFooter>
        </Card>
    )
}
