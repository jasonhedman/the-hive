import { NextRequest, NextResponse } from "next/server";

import { getSmartMoneyInflows } from "@/services/hellomoon";

export const POST = async (req: NextRequest) => {
    const { granularity } = await req.json();

    if (!granularity) {
        return NextResponse.json({ error: 'Granularity is required' }, { status: 400 });
    }

    const response = await getSmartMoneyInflows(granularity);

    return NextResponse.json(response);
}