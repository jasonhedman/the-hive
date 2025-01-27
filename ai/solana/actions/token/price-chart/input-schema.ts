import { z } from "zod";

export const TokenPriceChartInputSchema = z.object({
    tokenAddress: z.string().describe("The token address to check price chart for."),
}); 
