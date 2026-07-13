import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {VIDEOS} from "@/app/(formation-layout)/formations/data";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Plan de formation",
    description: "Bla bla bla bla",
}

export default function Page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Plan de formation</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {VIDEOS.map((video) => (
                    <Link href={`/formations/video/${video.id}`} key={video.id} className={'text-indigo-500 underline'}>
                        {video.title}
                    </Link>
                ))}
                <Link href={`/formations/video/404`}  className={'text-indigo-500 underline'}>
                    404
                </Link>
            </CardContent>
        </Card>
    )
}
