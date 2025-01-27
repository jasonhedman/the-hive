import { NextResponse } from "next/server";

import { getMentionsByUsername } from "@/services/twitter";

export const GET = async (request: Request, { params }: { params: Promise<{ username: string }> }) => {
    const { username } = await params;
    const tweets = await getMentionsByUsername(username);
    return NextResponse.json(tweets);
}