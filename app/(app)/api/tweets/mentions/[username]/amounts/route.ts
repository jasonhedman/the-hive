import { NextResponse } from "next/server";

import { getNumMentions } from "@/services/twitter";

export const GET = async (request: Request, { params }: { params: Promise<{ username: string }> }) => {
    const { username } = await params;
    return NextResponse.json(await getNumMentions(username));
}