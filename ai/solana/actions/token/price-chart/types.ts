import { z } from "zod";

import { TokenPriceChartInputSchema } from "./input-schema";
import type { SolanaActionResult } from "../../solana-action";

export type TokenPriceChartSchemaType = typeof TokenPriceChartInputSchema;

export type TokenPriceChartArgumentsType = z.infer<TokenPriceChartSchemaType>;

export type TokenPriceChartResultBodyType = {}; 

export type TokenPriceChartResultType = SolanaActionResult<TokenPriceChartResultBodyType>;
