"use client"

import {Star} from "lucide-react";
import {cn} from "@/lib/utils";
import {useState, useTransition} from "react";

type SelectStarProps = {
    star: number;
    action?: (star: number) => void;
}

export default function SelectStar({star, action}: SelectStarProps) {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [isPending, startTransition] = useTransition();

    return (
        <div className={cn("flex items-center gap-1", {"bg-red-500": isPending})}
             onMouseLeave={() => setHoverIndex(null)}
        >
            {Array.from({length: 5}).map((_, i) => {
                const isFilled = i < star;
                const isNewFilled = hoverIndex ? i - 1 < hoverIndex : null;
                return (
                    <button
                        onClick={() => {
                            startTransition(() => {
                                action?.(i + 1)
                            })
                        }}
                        onMouseEnter={() => setHoverIndex(i)}
                        key={i}
                    >
                        <Star
                            className={cn("text-yellow-400 cursor-pointer", {
                                "fill-yellow-400": isFilled,
                                "-translate-y-0.5 fill-orange-400 text-orange-400": isNewFilled
                            })}
                            style={{transitionDelay: `${i * 0.1}s`}}/>
                    </button>
                )
            })}
        </div>
    )
}