import { z } from "zod";

export const TokenPagePriceAnalysisInputSchema = z.object({
    length: z.number().min(1).max(90).default(3)
        .describe("The number of days of historical data to analyze"),
    includeTechnicalLevels: z.boolean().default(true)
        .describe("Whether to include support and resistance levels analysis"),
    includeMarketMetrics: z.boolean().default(true)
        .describe("Whether to include market cap and related metrics")
}); 