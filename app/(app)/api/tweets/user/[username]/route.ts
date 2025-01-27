import { NextResponse } from "next/server";

import { getPostsByUsername } from "@/services/twitter";

export const GET = async (request: Request, { params }: { params: Promise<{ username: string }> }) => {
    const { username } = await params;
    const tweets = await getPostsByUsername(username);
    return NextResponse.json(tweets);
}