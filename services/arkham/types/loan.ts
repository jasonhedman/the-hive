import { ArkhamEntity } from './base-response';

export interface LoanPosition {
    name: string;
    symbol: string;
    id: string;
    underlyingAssetID: string;
    address: string;
    balance: number;
    usd: number;
    price: number;
    price24hAgo: number;
    quoteTime: string;
    protocol: string;
    type: 'yield' | 'supplied' | 'borrowed';
    underlyingAssetAddress: string;
    market: string;
}

export interface LoanResponse {
    entities: Record<string, ArkhamEntity>;
    totalPositions: Record<string, number>;
    balances: Record<string, LoanPosition[]>;
}

export interface Counterparty {
    address: {
        address: string;
        chain: string;
        arkhamLabel?: {
            name: string;
            address: string;
            chainType: string;
        };
        isUserAddress: boolean;
        contract: boolean;
    };
    usd: number;
    transactionCount: number;
    flow: 'in' | 'out' | 'self';
    chains: string[];
}

export interface CounterpartyParams {
    last?: number;
    limit?: number;
    flow?: 'all' | 'in' | 'out' | 'self';
    tokens?: string[];
    chains?: string[];
}

export interface CounterpartyResponse {
    [chain: string]: Counterparty[];
} 