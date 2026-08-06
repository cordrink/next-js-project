"use server"

import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {actionClient, SafeError} from "@/lib/safe-action";
import {z} from "zod";

export const addReviewSafeAction = actionClient
    .inputSchema(z.object({
            name: z.string(),
            review: z.string(),
        })
    ).action(async ({parsedInput: input}) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (input.name  === "mechant") {
            throw new SafeError("Invalid name")
        }

        const newReview = await prisma.review.create({
            data: {
                review: input.review,
                name: input.name,
                star: 5
            }
        });

        revalidatePath("/");

        return newReview;
    });