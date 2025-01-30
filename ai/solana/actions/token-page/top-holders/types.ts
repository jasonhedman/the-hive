import { z } from "zod";

import { TokenPageTopHoldersInputSchema } from "./input-schema";
import { SolanaActionResult } from "../../solana-action";

export type TokenPageTopHoldersSchemaType = typeof TokenPageTopHoldersInputSchema;

export type TokenPageTopHoldersArgumentsType = z.infer<TokenPageTopHoldersSchemaType>;

export type TokenPageTopHoldersResultBodyType = {
    top10HoldersPercent: number;
    top20HoldersPercent: number;
    exchangeHoldersPercent: number;
    vestedHoldersPercent: number;
}; 

export type TokenPageTopHoldersResultType = SolanaActionResult<TokenPageTopHoldersResultBodyType>;