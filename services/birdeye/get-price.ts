import { queryBirdeye } from "./base";

import type { Price } from "./types";

export const getPrice = async (address: string): Promise<Price> => {
    return queryBirdeye<Price>('defi/price', { address, include_liquidity: 'true' });
};