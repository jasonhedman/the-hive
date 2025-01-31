import { SOLANA_TOKEN_PAGE_TOP_HOLDERS_NAME } from "./name";
import { SOLANA_TOKEN_PAGE_TOP_HOLDERS_PROMPT } from "./prompt";
import { TokenPageTopHoldersInputSchema } from "./input-schema";
import { TokenPageTopHoldersResultBodyType } from "./types";
import { getTokenPageTopHolders } from "./function";

import type { TokenPageAction } from "../token-page-action";

export class SolanaTokenPageTopHoldersAction implements TokenPageAction<typeof TokenPageTopHoldersInputSchema, TokenPageTopHoldersResultBodyType> {
  public name = SOLANA_TOKEN_PAGE_TOP_HOLDERS_NAME;
  public description = SOLANA_TOKEN_PAGE_TOP_HOLDERS_PROMPT;
  public argsSchema = TokenPageTopHoldersInputSchema;
  public func = getTokenPageTopHolders;
} 
