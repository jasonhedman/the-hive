export interface TokenMetadataExtensions {
    coingecko_id?: string;
    serum_v3_usdc?: string;
    serum_v3_usdt?: string;
    website?: string;
    telegram?: string;
    twitter?: string;
    description?: string;
    discord?: string;
    medium?: string;
}

export interface TokenMetadata {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    extensions: TokenMetadataExtensions;
    logo_uri: string;
}