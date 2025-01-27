import { getLpTokensByAddress } from "./get-lp-tokens-by-address";

import { getPrices } from "../birdeye";

import { chunkArray } from "@/lib/utils";

import type { LpPortfolio, LpToken } from "./types";
import type { ApiV3PoolInfoStandardItem } from "@raydium-io/raydium-sdk-v2";
import type { Price } from "../birdeye/types";

export const getLpPortfolio = async (address: string): Promise<LpPortfolio> => {

    const lpTokens = await getLpTokensByAddress(address);

    const tokens = new Set(lpTokens.map(lpToken => [lpToken.pool.mintA.address, lpToken.pool.mintB.address]).flat());

    const prices = (await Promise.all(chunkArray(Array.from(tokens), 10).map(async (tokenAddresses) => await getPrices(tokenAddresses))))
        .reduce((acc, price) => ({ ...acc, ...price }), {} as Record<string, Price>);

    const getLpTokenValue = (lpToken: LpToken) => {

        const pool = lpToken.pool as ApiV3PoolInfoStandardItem;

        if(!pool.lpMint) return 0;

        if(!prices[pool.mintB.address] || !prices[pool.mintA.address]) return 0;

        return ((lpToken.amount / 10 ** lpToken.decimals) / pool.lpAmount) * (pool.mintAmountB * (prices[pool.mintB.address]!.value || 0) + pool.mintAmountA * (prices[pool.mintA.address]!.value || 0))
    }

    return {
        items: lpTokens.map(lpToken => ({
            ...lpToken,
            valueUsd: getLpTokenValue(lpToken),
        })),
        totalUsd: lpTokens.reduce((acc, lpToken) => acc + getLpTokenValue(lpToken), 0),
    };
}