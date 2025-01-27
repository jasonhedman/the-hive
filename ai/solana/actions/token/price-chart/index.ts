import { SOLANA_TOKEN_PRICE_CHART_NAME } from "./name";
import { SOLANA_TOKEN_PRICE_CHART_PROMPT } from "./prompt";
import { TokenPriceChartInputSchema } from "./input-schema";
import { TokenPriceChartResultBodyType } from "./types";
import { getPriceChart } from "./function";

import type { SolanaAction } from "../../solana-action";

export class SolanaTokenPriceChartAction implements SolanaAction<typeof TokenPriceChartInputSchema, TokenPriceChartResultBodyType> {
  public name = SOLANA_TOKEN_PRICE_CHART_NAME;
  public description = SOLANA_TOKEN_PRICE_CHART_PROMPT;
  public argsSchema = TokenPriceChartInputSchema;
  public func = getPriceChart;
} 