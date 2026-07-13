"use client"
import {Alert, AlertTitle} from "@/components/ui/alert";
import {TriangleAlert} from "lucide-react";

export default function Error() {
    return (
        <Alert>
            <TriangleAlert size={16} />
            <AlertTitle>unexpected error occurred in our beautiful application</AlertTitle>
        </Alert>
    );
};
