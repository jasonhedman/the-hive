import { NextRequest, NextResponse } from "next/server";

import { getTokenMetadata } from "@/services/birdeye";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ address: string }> }) => {
    const { address } = await params;

    const metadata = await getTokenMetadata(address);
    
    return NextResponse.json(metadata);
}