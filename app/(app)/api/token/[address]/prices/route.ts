import { NextResponse, NextRequest } from "next/server";

import { getTokenCandlesticks } from "@/services/hellomoon";

export const POST = async (req: NextRequest, { params }: { params: Promise<{ address: string }> }) => {
    const { address } = await params;

    const { timeframe, numDays } = await req.json();
    
    const prices = await getTokenCandlesticks(address, timeframe, numDays);

    return NextResponse.json(prices);
}