import { SOLANA_GET_TOP_TRADERS_NAME } from "./name";
import { SOLANA_GET_TOP_TRADERS_PROMPT } from "./prompt";
import { GetTopTradersInputSchema } from "./input-schema";
import { getTopTraders } from "./function";

import type { GetTopTradersResultBodyType } from "./types";
import type { SolanaAction } from "../../solana-action";

export class SolanaGetTopTradersAction implements SolanaAction<typeof GetTopTradersInputSchema, GetTopTradersResultBodyType> {
  public name = SOLANA_GET_TOP_TRADERS_NAME;
  public description = SOLANA_GET_TOP_TRADERS_PROMPT;
  public argsSchema = GetTopTradersInputSchema;
  public func = getTopTraders;
} 