import { getTransactionHistory } from "@/services/helius";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ address: string }> }) => {
    const { address } = await params;
    const transactions = await getTransactionHistory(address);
    return NextResponse.json(transactions);
}