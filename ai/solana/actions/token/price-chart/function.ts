import type { TokenPriceChartResultBodyType } from "./types";
import type { SolanaActionResult } from "../../solana-action";

export async function getPriceChart(): Promise<SolanaActionResult<TokenPriceChartResultBodyType>> {
  try {
    return {
      message: `The price chart has been retrieved and displayed to the user. Do not reiterate the raw data.`,
      body: {}
    };
  } catch (error) {
    return {
      message: `Error getting top holders: ${error}`,
    };
  }
} 