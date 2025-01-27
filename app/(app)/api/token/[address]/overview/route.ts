import { NextRequest, NextResponse } from "next/server";

import { getTokenOverview } from "@/services/birdeye";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ address: string }> }) => {
    const { address } = await params;

    const overview = await getTokenOverview(address);
    
    return NextResponse.json(overview);
}