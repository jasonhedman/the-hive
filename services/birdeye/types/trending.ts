export interface TrendingToken {
    address: string;
    decimals: number;
    liquidity: number;
    logoURI: string;
    name: string;
    symbol: string;
    volume24hUSD: number;
    rank: number;
    price: number;
    price24hChangePercent: number;
}

export interface TrendingTokensResponse {
    updateUnixTime: number;
    updateTime: string;
    tokens: TrendingToken[];
    total: number;
}
