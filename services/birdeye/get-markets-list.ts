import { queryBirdeye } from "./base";

import type { MarketsResponseData } from "./types";

export const getMarketsList = async (address: string): Promise<MarketsResponseData> => {
    const response = await queryBirdeye<MarketsResponseData>('defi/v2/markets', {
        address,
        time_frame: '24h',
        sort_type: 'desc',
        sort_by: 'liquidity',
        limit: 20,
    });

    return response;
}