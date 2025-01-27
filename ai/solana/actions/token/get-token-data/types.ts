import { z } from "zod";

import { GetTokenDataInputSchema } from "./input-schema";

import type { SolanaActionResult } from "../../solana-action";
import type { TokenOverview } from "@/services/birdeye/types";

export type GetTokenDataSchemaType = typeof GetTokenDataInputSchema;

export type GetTokenDataArgumentsType = z.infer<GetTokenDataSchemaType>;

export type GetTokenDataResultBodyType = {
    token: TokenOverview;
}; 

export type GetTokenDataResultType = SolanaActionResult<GetTokenDataResultBodyType>;