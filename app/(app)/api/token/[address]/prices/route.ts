import { NextResponse, NextRequest } from "next/server";

import { fetchOHLCV } from "@/services/birdeye";

export const POST = async (req: NextRequest, { params }: { params: Promise<{ address: string }> }) => {
    const { address } = await params;

    const { timeframe, numDays } = await req.json();
    
    const { items} = await fetchOHLCV({
        address: address,
        timeframe,
        timeFrom: Math.floor(Date.now() / 1000) - numDays * 86400,
        timeTo: Math.floor(Date.now() / 1000)
    });

    return NextResponse.json(items);
}