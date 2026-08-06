"use client"

import {startTransition, useOptimistic, useRef, useState} from "react";
import {Edit} from "lucide-react";
import {cn} from "@/lib/utils";

type EditTitleProps = {
    children: string;
    action?: (newTitle: string) => void;
    className?: string;
}

export const EditTitle = ({children, action, className}: EditTitleProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const ref = useRef<HTMLInputElement>(null)

    const [title, setTitle] = useOptimistic(
        children,
        (_, newTitle: string) => newTitle
    )

    const submit = () => {
        setIsEditing(true);
        const newTitle = ref.current?.value || "";
        action?.(newTitle);
        startTransition(() => {
            setTitle(newTitle);
        })
    }

    if (isEditing) {
        return (
            <div className={"group flex items-center gap-2"}>
                <input
                    ref={ref}
                    type={"text"}
                    style={{fieldSizing: "content"}}
                    className={cn(className)}
                    defaultValue={children}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            submit()
                        }
                    }}
                />
                <button
                    onClick={() => {
                        submit();
                    }}
                    className={"group-hover:opacity-100 opacity-0 p-1 bg-accent"}
                >
                    <Edit size={16}/></button>
            </div>
        )
    }

    return (
        <div className={"group flex items-center gap-2"}>
            <p className={cn(className)}>{title}</p>
            <button
                onClick={() => {
                    setIsEditing(true)
                    setTimeout(() => {
                        ref.current?.focus()
                    }, 300);
                }}
                className={"group-hover:opacity-100 opacity-0 p-1 bg-accent"}
            >
                <Edit size={16}/></button>
        </div>
    );
};
