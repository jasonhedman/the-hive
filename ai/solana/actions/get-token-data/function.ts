import { getTokenDataAndPairByTicker, getTokenDataAndPairByAddress } from "@/lib/solana";

import type { SolanaActionResult } from "../solana-action";

import type { GetTokenDataArgumentsType, GetTokenDataResultBodyType } from "./types";

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenData(args: GetTokenDataArgumentsType): Promise<SolanaActionResult<GetTokenDataResultBodyType>> {
  try {

    if (args.address) {
        const token = await getTokenDataAndPairByAddress(args.address);
        if (!token) {
            throw new Error('Failed to fetch token data');
        }
        return {
            message: `Found token data for ${args.address}. The user is shown the following token data in the UI, DO NOT REITERATE THE TOKEN DATA. Ask the user what they want to do next.`,
            body: {
                token: token.token,
                pair: token.pair
            }
        }
    } else if (args.ticker) {
        const token = await getTokenDataAndPairByTicker(args.ticker);
        if (!token) {
            throw new Error('Failed to fetch token data');
        }
        return {
            message: `Found token data for ${args.ticker}. The user is shown the following token data in the UI, DO NOT REITERATE THE TOKEN DATA. Ask the user what they want to do next.`,
            body: {
                token: token.token,
                pair: token.pair
            }
        }
    } else {
        throw new Error('Invalid input');
    }
  } catch (error) {
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}