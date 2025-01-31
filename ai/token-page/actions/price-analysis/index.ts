import { SOLANA_TOKEN_PAGE_PRICE_ANALYSIS_NAME } from "./name";
import { SOLANA_TOKEN_PAGE_PRICE_ANALYSIS_PROMPT } from "./prompt";
import { TokenPagePriceAnalysisInputSchema } from "./input-schema";
import { TokenPagePriceAnalysisResultBodyType } from "./types";
import { analyzeTokenPrice } from "./function";

import type { TokenPageAction } from "../token-page-action";

export class SolanaTokenPagePriceAnalysisAction implements TokenPageAction<typeof TokenPagePriceAnalysisInputSchema, TokenPagePriceAnalysisResultBodyType> {
  public name = SOLANA_TOKEN_PAGE_PRICE_ANALYSIS_NAME;
  public description = SOLANA_TOKEN_PAGE_PRICE_ANALYSIS_PROMPT;
  public argsSchema = TokenPagePriceAnalysisInputSchema;
  public func = analyzeTokenPrice;
} 