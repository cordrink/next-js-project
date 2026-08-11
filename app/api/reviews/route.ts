import {NextRequest, NextResponse} from "next/server";
import {SafeError} from "@/lib/safe-action";
import {prisma} from "@/lib/prisma";
import {z} from "zod";

const Schema = z.object({
    name: z.string(),
    review: z.string(),
})

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const input = Schema.parse(body);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (input.name === "mechant") {
        throw new SafeError("Invalid name")
    }

    const newReview = await prisma.review.create({
        data: {
            review: input.review,
            name: input.name,
            star: 5
        }
    });

    return NextResponse.json({
        review: newReview,
    });
}