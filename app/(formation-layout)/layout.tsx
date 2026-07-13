import {PropsWithChildren} from "react";
import {PageLayout} from "@/components/layout";
import Link from "next/link";

export default function Layout({children}: PropsWithChildren) {
    return (
        <PageLayout>
            <header className={"border-b -mx-4 px-4 pb-2"}>
                <Link href="/formations" className={"font-bold"}>/formation</Link>
            </header>
            {children}
        </PageLayout>
    )
}