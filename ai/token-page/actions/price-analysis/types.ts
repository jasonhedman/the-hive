import { z } from "zod";

import { TokenPagePriceAnalysisInputSchema } from "./input-schema";
import { SolanaActionResult } from "../../../solana/actions/solana-action";

export type TokenPagePriceAnalysisSchemaType = typeof TokenPagePriceAnalysisInputSchema;

export type TokenPagePriceAnalysisArgumentsType = z.infer<TokenPagePriceAnalysisSchemaType>;

export type PriceVolatility = {
    daily: number;
    weekly: number;
    description: string;
};

export type TrendAnalysis = {
    direction: 'bullish' | 'bearish' | 'sideways';
    strength: number;
    description: string;
};

export type SupportResistance = {
    support: number[];
    resistance: number[];
};

export type TokenPagePriceAnalysisResultBodyType = {
    currentPrice: number;
    volatility: PriceVolatility;
    trendAnalysis: TrendAnalysis;
    technicalLevels: SupportResistance;
    tradingVolume: {
        current24h: number;
        change24h: number;
        averageDaily: number;
    };
    marketMetrics: {
        marketCap: number;
        fullyDilutedValue: number;
        rank: number | null;
    };
};

export type TokenPagePriceAnalysisResultType = SolanaActionResult<TokenPagePriceAnalysisResultBodyType>;