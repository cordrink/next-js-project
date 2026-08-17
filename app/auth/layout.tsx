import {PropsWithChildren} from "react";
import {PageLayout} from "@/components/layout";

export default function Layout({children}: PropsWithChildren) {
    return (
        <PageLayout>
            {children}
        </PageLayout>
    )
}