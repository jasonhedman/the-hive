import { z } from "zod";

import { TokenPageTopHoldersInputSchema } from "./input-schema";
import { SolanaActionResult } from "../../../solana/actions/solana-action";

export type TokenPageTopHoldersSchemaType = typeof TokenPageTopHoldersInputSchema;

export type TokenPageTopHoldersArgumentsType = z.infer<TokenPageTopHoldersSchemaType>;

export type TokenPageTopHoldersResultBodyType = {
    top5HoldersPercent: number;
    top10HoldersPercent: number;
    top20HoldersPercent: number;
    exchangeHoldersPercent: number;
    vestedHoldersPercent: number;
    largestHolder: number;
    remainingSupplyPercent: number;
    avgTop10Holding: number;
    avgExchangeHolding: number;
    concentrationLevel: string;
    exchangePresence: string;
    numExchanges: number;
    numVestingContracts: number;
}; 

export type TokenPageTopHoldersResultType = SolanaActionResult<TokenPageTopHoldersResultBodyType>;