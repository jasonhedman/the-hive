import { z } from "zod";

import type { GetTrendingTokensInputSchema } from "./input-schema";
import type { SolanaActionResult } from "../../solana-action";
import type { TrendingToken } from "@/services/birdeye/types";

export type GetTrendingTokensSchemaType = typeof GetTrendingTokensInputSchema;

export type GetTrendingTokensArgumentsType = z.infer<GetTrendingTokensSchemaType>;

export type GetTrendingTokensResultBodyType = {
    tokens: TrendingToken[];
}; 

export type GetTrendingTokensResultType = SolanaActionResult<GetTrendingTokensResultBodyType>;