import { z } from "zod";

import type { GetSmartMoneyInflowsInputSchema } from "./input-schema";
import type { SolanaActionResult } from "../../solana-action";
import type { SmartMoneyTokenInflow } from "@/services/hellomoon/types";
import type { Price, TokenMetadata } from "@/services/birdeye/types";
export type GetSmartMoneyInflowsSchemaType = typeof GetSmartMoneyInflowsInputSchema;

export type GetSmartMoneyInflowsArgumentsType = z.infer<GetSmartMoneyInflowsSchemaType>;

export type GetSmartMoneyInflowsResultBodyType = {
    tokens: {
        inflow: SmartMoneyTokenInflow;
        token: TokenMetadata;
        price: Price;
    }[];
}; 

export type GetSmartMoneyInflowsResultType = SolanaActionResult<GetSmartMoneyInflowsResultBodyType>;