import type { EnrichedTransaction } from "helius-sdk";

export const getTransactionHistory = async (address: string): Promise<EnrichedTransaction[]> => {
    const response = await fetch(`https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=${process.env.HELIUS_API_KEY}`, {
        method: 'GET',
        headers: {},
    });
    const data = await response.json();
    return data;
}