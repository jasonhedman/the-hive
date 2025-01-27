import { NextRequest, NextResponse } from "next/server";

import { getTokenHolders } from "@/services/birdeye";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ address: string }> }) => {
    const { address } = await params;

    const { items: topHolders } = await getTokenHolders({
        address,
        offset: 0,
        limit: 20
    });
    
    return NextResponse.json(topHolders);
}


