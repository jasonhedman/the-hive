import { searchTokens } from "@/services/birdeye";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { search } = await req.json();
    
    const tokens = await searchTokens({
        keyword: search,
        limit: 10,
        verifyToken: true,
    });

    return NextResponse.json(tokens.items);
}