import { getBestLiquidStaking } from "@/services/staking-rewards";

import { getTokenBySymbol } from "@/db/services";

import type { LiquidStakingYieldsArgumentsType, LiquidStakingYieldsResultBodyType } from "./types";
import type { SolanaActionResult } from "../../solana-action";

/**
 * Gets the best liquid staking yields from Staking Rewards API.
 *
 * @param args - The input arguments for the action
 * @returns A message containing the best liquid staking yields information
 */
export async function getLiquidStakingYields(
  args: LiquidStakingYieldsArgumentsType
): Promise<SolanaActionResult<LiquidStakingYieldsResultBodyType>> {
  try {
    const bestLiquidStaking = await getBestLiquidStaking(6);

    console.log(bestLiquidStaking);

    return {
      message: `Found ${bestLiquidStaking.data.rewardOptions.length} best liquid staking yields. The user has been shown the options in the UI, ask them which they want to use. DO NOT REITERATE THE OPTIONS IN TEXT.`,
      body: (await Promise.all(bestLiquidStaking.data.rewardOptions.map(async (option) => ({
        name: option.outputAssets[0].name,
        yield: option.metrics.find((metric) => metric.metricKey === "reward_rate")?.defaultValue ?? 0,
        tokenData: await getTokenBySymbol(option.outputAssets[0].symbol)
      })))).filter((item) => item.tokenData !== undefined) as LiquidStakingYieldsResultBodyType
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting best liquid staking yields: ${error}`,
    };
  }
}
