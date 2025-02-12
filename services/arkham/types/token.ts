import { ArkhamAddress } from './base-response';

export interface TokenHolder {
    address: ArkhamAddress;
    balance: number;
    usd: number;
    pctOfCap: number;
}

export interface TokenHolderResponse {
    token: {
        identifier: {
            pricingID: string;
        };
        name: string;
        symbol: string;
    };
    totalSupply: Record<string, number>;
    holders: Record<string, TokenHolder[]>;
}

export interface TokenFlow {
    address: ArkhamAddress;
    inUSD: number;
    outUSD: number;
}

export interface TokenVolume {
    inUSD: number;
    outUSD: number;
    inValue: number;
    outValue: number;
    time: string;
}

export interface TokenBalance {
    pricingID: string;
    name: string;
    symbol: string;
    balance: number;
    price: number;
    usd: number;
}

export interface PortfolioEntry {
    id: string;
    name: string;
    symbol: string;
    balance: number;
    price: number;
    usd: number;
}

export interface PortfolioResponse {
    entities?: Record<string, any>;
    totalBalance: Record<string, number>;
    totalBalance24hAgo: Record<string, number>;
    balances: Record<string, PortfolioEntry[]>;
}

export interface PortfolioTimeSeriesEntry {
    id: string;
    name: string;
    symbol: string;
    balance: number;
    price: number;
    usd: number;
}

export interface PortfolioTimeSeriesResponse {
    [date: string]: {
        [token: string]: PortfolioTimeSeriesEntry;
    };
} 