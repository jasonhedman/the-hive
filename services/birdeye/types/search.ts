export interface TokenSearchResult {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
    fdv: number;
    market_cap: number;
    liquidity: number;
    volume_24h_change_percent: number | null;
    price: number;
    price_change_24h_percent: number;
    network: string;
    buy_24h: number;
    buy_24h_change_percent: number | null;
    sell_24h: number;
    sell_24h_change_percent: number | null;
    trade_24h: number;
    trade_24h_change_percent: number | null;
    unique_wallet_24h: number;
    unique_view_24h_change_percent: number | null;
    last_trade_human_time: string;
    last_trade_unix_time: number;
    creation_time: string;
    volume_24h_usd: number;
    logo_uri: string;
    verified: boolean;
}

export interface SearchResultItem {
    type: string;
    result: TokenSearchResult[];
}

export interface SearchResponse {
    items: SearchResultItem[];
}