import { TokenSmartMoneyInflowRequest, TokenSmartMoneyInflow } from "@hellomoon/api";

import client from "./client";

import { Granularity } from "./types";

export const getSmartMoneyInflows = async (granularity: Granularity, limit: number = 10): Promise<TokenSmartMoneyInflow[]> => {
    const response = await client.send(new TokenSmartMoneyInflowRequest({
        granularity,
        limit,
    }));
    return response.data;
}