import { NextRequest, NextResponse } from "next/server";

import { getTokenUsersOverTime } from "@/services/hellomoon";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ address: string }> }) => {
    const { address } = await params;

    const usersOverTime = (await getTokenUsersOverTime(address)).reverse();
    
    return NextResponse.json(usersOverTime);
}