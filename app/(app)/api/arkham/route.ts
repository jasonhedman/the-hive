import { getAllTags, getTokenTopFlowByChainAndAddress } from "@/services/arkham";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const tokenTopFlow = await getAllTags();

    return NextResponse.json(tokenTopFlow);
}