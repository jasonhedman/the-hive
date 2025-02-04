import { NextRequest, NextResponse } from "next/server";

import { getMarketsList } from "@/services/birdeye";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ address: string }> }) => {
    const { address } = await params;

    const markets = await getMarketsList(address);
    
    return NextResponse.json(markets);
}