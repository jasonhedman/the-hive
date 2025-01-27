import { NextRequest, NextResponse } from "next/server";

import { getTopTradersByToken } from "@/services/birdeye";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ address: string }> }) => {
    const { address } = await params;

    const { items: topTraders } = await getTopTradersByToken({
        address,
        offset: 0,
        limit: 10
    });
    
    return NextResponse.json(topTraders);
}