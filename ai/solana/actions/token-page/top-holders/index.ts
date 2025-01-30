import { SOLANA_TOKEN_PAGE_TOP_HOLDERS_NAME } from "./name";
import { SOLANA_TOKEN_PAGE_TOP_HOLDERS_PROMPT } from "./prompt";
import { TokenPageTopHoldersInputSchema } from "./input-schema";
import { TokenPageTopHoldersArgumentsType, TokenPageTopHoldersResultBodyType } from "./types";
import { getTokenPageTopHolders } from "./function";

import type { SolanaAction } from "../../solana-action";

export class SolanaTokenPageTopHoldersAction implements SolanaAction<typeof TokenPageTopHoldersInputSchema, TokenPageTopHoldersResultBodyType> {
  private tokenAddress: string;

  constructor(tokenAddress: string) {
    this.tokenAddress = tokenAddress;
  }
  public name = SOLANA_TOKEN_PAGE_TOP_HOLDERS_NAME;
  public description = SOLANA_TOKEN_PAGE_TOP_HOLDERS_PROMPT;
  public argsSchema = TokenPageTopHoldersInputSchema;
  public func = (args: TokenPageTopHoldersArgumentsType) => getTokenPageTopHolders(this.tokenAddress, args);
} 
