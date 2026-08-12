import {ModeToggle} from "@/components/mode-toggle";
import Link from "next/link";
import {PageLayout} from "@/components/layout";

export default async function Home() {

    return (
        <PageLayout>
            <h1>Learn next</h1>
            <Link href={'/formations'} className={'text-indigo-500 underline'}>
                Plan de formation
            </Link>
            <ModeToggle/>
        </PageLayout>
    );
}
