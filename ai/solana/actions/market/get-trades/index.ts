import { SOLANA_GET_TRADER_TRADES_NAME } from "./name";
import { SOLANA_GET_TRADER_TRADES_PROMPT } from "./prompt";
import { GetTraderTradesInputSchema } from "./input-schema";
import { getTraderTrades } from "./function";

import type { GetTraderTradesResultBodyType } from "./types";
import type { SolanaAction } from "../../solana-action";

export class SolanaGetTraderTradesAction implements SolanaAction<typeof GetTraderTradesInputSchema, GetTraderTradesResultBodyType> {
  public name = SOLANA_GET_TRADER_TRADES_NAME;
  public description = SOLANA_GET_TRADER_TRADES_PROMPT;
  public argsSchema = GetTraderTradesInputSchema;
  public func = getTraderTrades;
} 