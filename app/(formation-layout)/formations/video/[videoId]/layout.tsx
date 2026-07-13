import {PropsWithChildren} from "react";
import Link from "next/link";
import {VIDEOS} from "@/app/(formation-layout)/formations/data";


export default async function Layout(props: PropsWithChildren<{
    params: Promise<{ videoId: string }>
}>) {
    const {videoId} = await props.params;

    const video = VIDEOS.find(video => video.id === videoId);

    if (!video) return <p>Invalid video</p>;

    return (
        <div>
            <header className={"border-b flex items-center gap-2 -mx-4 px-4 pb-2 mb-4"}>
                <Link
                    href={`/formations/video/${videoId}`}
                    className={"font-bold"}
                >/formation/{videoId}</Link>
                {video.lessons.map(lesson => (
                    <Link
                        key={lesson.id} href={`/formations/video/${videoId}/lessons/${lesson.id}`}
                        className={"text-xs"}
                    >{lesson.title}</Link>
                ))}
                <Link
                    href={`/formations/video/${videoId}/lessons/404`}
                    className={"text-xs"}
                >404</Link>
            </header>
            {props.children}
        </div>
    )
}