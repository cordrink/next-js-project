import {NextRequest, NextResponse} from "next/server";

export const POST = async (request: NextRequest) => {
    console.log(request.nextUrl);

    return NextResponse.json({
        id: "1"
    });
}