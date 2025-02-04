import { SOLANA_TOKEN_PAGE_LIQUIDITY_NAME } from "./name";
import { SOLANA_TOKEN_PAGE_LIQUIDITY_PROMPT } from "./prompt";
import { TokenPageLiquidityInputSchema } from "./input-schema";
import { TokenPageLiquidityResultBodyType } from "./types";
import { getTokenPageLiquidity } from "./function";

import type { TokenPageAction } from "../token-page-action";

export class SolanaTokenPageLiquidityAction implements TokenPageAction<typeof TokenPageLiquidityInputSchema, TokenPageLiquidityResultBodyType> {
  public name = SOLANA_TOKEN_PAGE_LIQUIDITY_NAME;
  public description = SOLANA_TOKEN_PAGE_LIQUIDITY_PROMPT;
  public argsSchema = TokenPageLiquidityInputSchema;
  public func = getTokenPageLiquidity;
} 