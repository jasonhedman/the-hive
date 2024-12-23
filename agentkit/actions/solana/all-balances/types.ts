import { z } from "zod";

import { AllBalancesInputSchema } from "./input-schema";
import { SolanaActionResult } from "../../solana-action";

export type AllBalancesSchemaType = typeof AllBalancesInputSchema;

export type AllBalancesArgumentsType = z.infer<AllBalancesSchemaType>;

export type AllBalancesResultBodyType = {
    balances: {
        balance: number;
        token: string;
    }[];
}; 

export type AllBalancesResultType = SolanaActionResult<AllBalancesResultBodyType>;
