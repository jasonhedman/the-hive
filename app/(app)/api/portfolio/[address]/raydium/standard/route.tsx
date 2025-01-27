import { NextRequest, NextResponse } from "next/server";

import { getLpPortfolio } from "@/services/raydium/get-lp-portfolio";

export const GET = async (_: NextRequest, { params }: { params: Promise<{ address: string }> }) => {
  const { address } = await params;

  const portfolio = await getLpPortfolio(address);

  return NextResponse.json(portfolio);
}