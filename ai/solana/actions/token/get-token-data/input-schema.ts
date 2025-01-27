import { z } from "zod";

export const GetTokenDataInputSchema = z.object({
    search: z.string().describe("The name, ticker, or name of the token to get data for"),
});
