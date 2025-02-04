import { TokenPriceCandlesticksRequest } from "@hellomoon/api";
import { getMint } from "@solana/spl-token";
import client from "./client"
import { CandlestickGranularity, TokenPriceCandlestick } from "./types";
import { Connection, PublicKey } from "@solana/web3.js";

export const getTokenCandlesticks = async (mint: string, granularity: CandlestickGranularity, numDays: number, limit: number = 1000): Promise<TokenPriceCandlestick[]> => {

    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
    
    // Get token decimals
    const mintInfo = await getMint(connection, new PublicKey(mint));
    const decimals = mintInfo.decimals;

    const res = await client.send(new TokenPriceCandlesticksRequest({
        mint,
        granularity,
        startTime: {
            value: Math.floor(Date.now() / 1000) - (numDays * 86400),
            operator: ">"
        },
        limit
    }));

    // Adjust values using decimals
    const adjustedData = res.data.map(candle => ({
        timestamp: candle.startTime as unknown as number,
        open: candle.open / (10 ** decimals),
        high: candle.high / (10 ** decimals),
        low: candle.low / (10 ** decimals),
        close: candle.close / (10 ** decimals),
        volume: candle.volume / (10 ** decimals),
    })).reverse();

    return adjustedData;
}