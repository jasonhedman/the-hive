export enum MarketSource {
    Raydium = "Raydium",
    RaydiumClamm = "Raydium Clamm",
    MeteoraDlmm = "Meteora Dlmm",
    Orca = "Orca"
}

export interface TokenInfo {
    address: string;
    decimals: number;
    symbol: string;
    icon: string;
}

export interface MarketItem {
    address: string;
    base: TokenInfo;
    quote: TokenInfo;
    createdAt: string;
    liquidity: number;
    name: string;
    price: number;
    source: MarketSource;
    volume24h: number;
    trade24h: number;
    trade24hChangePercent: number;
    uniqueWallet24h: number;
    uniqueWallet24hChangePercent: number;
}

export interface MarketsResponseData {
    items: MarketItem[];
    total: number;
}
