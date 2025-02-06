export interface ArkhamEntity {
    name: string;
    note: string;
    id: string;
    type: string;
    service: string | null;
    addresses: any | null;
    website: string;
    twitter: string;
    crunchbase?: string;
    linkedin?: string;
    populatedTags?: ArkhamTag[];
    description?: string;
}

export interface ArkhamTag {
    id: string;
    label: string;
    rank: number;
    excludeEntities: boolean;
    disablePage: boolean;
    chain?: string;
    tagParams?: string;
}

export interface ArkhamLabel {
    name: string;
    address: string;
    chainType?: string;
}

export interface ArkhamAddress {
    address: string;
    chain: string;
    depositServiceID?: string;
    arkhamEntity?: ArkhamEntity;
    arkhamLabel?: ArkhamLabel;
    isUserAddress: boolean;
    contract?: boolean;
    populatedTags?: ArkhamTag[];
}

export interface TokenInfo {
    id: string;
    name: string;
    symbol: string;
    balance?: number;
    price?: number;
    usd?: number;
    ethereumAddress?: string;
    balanceExact?: string;
    quoteTime?: string;
    priceChange24hPercent?: number;
    priceChange24h?: number;
}

export interface ChainStatus {
    chain: string;
    active: boolean;
    price: number;
    priceChange24h: number;
    priceChange24hPercent: number;
    volume: number;
    marketCap: number;
    tip: number;
    tps: number;
    transfers: number;
    gasFee: number;
    satFee: string | null;
}

export interface HistoricalDataPoint {
    time: string;
    usd: number;
    volume24h: number;
    marketCap: number;
}

export interface TagInfo {
    id: string;
    template: string;
    rank: number;
    excludeEntities: boolean;
    category: string;
    description: string;
    disablePage: boolean;
    tagName: string;
} 