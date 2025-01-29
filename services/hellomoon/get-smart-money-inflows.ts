import { hellomoonPost } from "./base";

import type { SmartMoneyInflowsResponse, Granularity } from "./types";

export const getSmartMoneyInflows = async (granularity: Granularity, limit: number = 10) => {
    const response = await hellomoonPost<SmartMoneyInflowsResponse>('token/smart-money-inflow', {
        granularity,
        limit,
    });

    return response;
}