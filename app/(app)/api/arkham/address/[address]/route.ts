import { getAddressIntelligence } from "@/services/arkham";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ address: string }> }) => {
    const { address } = await params;

    const addressIntelligence = await getAddressIntelligence(address, "solana");

    return NextResponse.json(addressIntelligence);
}