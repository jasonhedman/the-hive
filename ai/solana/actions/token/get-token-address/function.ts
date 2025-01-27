import { searchTokens } from "@/services/birdeye";

import type { SolanaActionResult } from "../../solana-action";
import type { GetTokenAddressArgumentsType, GetTokenAddressResultBodyType } from "./types";

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenAddress(args: GetTokenAddressArgumentsType): Promise<SolanaActionResult<GetTokenAddressResultBodyType>> {
  try {
    const token = await searchTokens({ keyword: args.keyword });
    if (!token) {
        throw new Error('Failed to fetch token data');
    }

    const tokenAddress = token?.items[0]?.result[0]?.address;

    if (!tokenAddress) {
        throw new Error('Failed to fetch token address');
    }

    return {
        message: `Found token address for ${args.keyword}. The user is shown the following token address in the UI, DO NOT REITERATE THE TOKEN ADDRESS. Ask the user what they want to do next.`,
        body: {
          address: tokenAddress,
        }
    }
  } catch (error) {
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}