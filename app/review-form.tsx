"use client"

import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {addReviewSafeAction} from "@/app/review.action";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useAction} from "next-safe-action/hooks";

export const ReviewFrom = () => {
    const {executeAsync, hasErrored, result, hasSucceeded} = useAction(addReviewSafeAction);

    const updateReview = async (obj: {name: string; review: string}) => {
        const result = await fetch("/api/reviews", {
            method: "POST",
            body: JSON.stringify(obj),
        }).then((res) => res.json());

        console.log({result});
    };

    return (
        <form action={async (formData) => {
            const name = formData.get("name") as string
            const review = formData.get("review") as string
            await updateReview({name, review})
        }} className="flex flex-col gap-4">
            <div className={"space-y-2"}>
                <Label htmlFor="name">Name</Label>
                <Input type={"text"} name={"name"} id="name" aria-label={'name'}/>
            </div>
            <div className={"space-y-2"}>
                <Label htmlFor="review">Review</Label>
                <Textarea name={"review"} id="review" aria-label={'review'}/>
            </div>
            <Button type={"submit"}>Submit</Button>
            {hasErrored && (
                <p className={"text-red-500"}>{result.serverError}</p>
            )}
            {hasSucceeded && (
                <p className={"text-red-500"}>Review created with id : {result.data.id}</p>
            )}
        </form>
    );
}