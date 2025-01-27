import { SOLANA_TOKEN_TOP_TRADERS_NAME } from "./name";
import { SOLANA_TOKEN_TOP_TRADERS_PROMPT } from "./prompt";
import { TopTokenTradersInputSchema } from "./input-schema";
import { TopTokenTradersResultBodyType } from "./types";

import { getTopTokenTraders } from "./function";

import type { SolanaAction } from "../../solana-action";

export class SolanaTopTokenTradersAction implements SolanaAction<typeof TopTokenTradersInputSchema, TopTokenTradersResultBodyType> {
  public name = SOLANA_TOKEN_TOP_TRADERS_NAME;
  public description = SOLANA_TOKEN_TOP_TRADERS_PROMPT;
  public argsSchema = TopTokenTradersInputSchema;
  public func = getTopTokenTraders;
} 