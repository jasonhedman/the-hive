import { z } from "zod";

import { TokenPageLiquidityInputSchema } from "./input-schema";
import { SolanaActionResult } from "../../../solana/actions/solana-action";
import { MarketSource } from "@/services/birdeye/types/markets";

export type TokenPageLiquiditySchemaType = typeof TokenPageLiquidityInputSchema;

export type TokenPageLiquidityArgumentsType = z.infer<TokenPageLiquiditySchemaType>;

export type TokenPageLiquidityResultBodyType = {
    totalLiquidityUSD: number;
    mainPool: {
        address: string;
        liquidity: number;
        source: MarketSource;
    };
    volumeMetrics: {
        volume24h: number;
        volumeChange24h: number;
    };
    liquidityConcentration: {
        topPoolShare: number;
        top3PoolsShare: number;
    };
    liquidityHealth: {
        score: number;
        description: string;
    };
}; 

export type TokenPageLiquidityResultType = SolanaActionResult<TokenPageLiquidityResultBodyType>;