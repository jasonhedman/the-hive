import { ArkhamAddress } from './base-response';

export interface Swap {
    id: string;
    chain: string;
    blockTimestamp: string;
    blockNumber: number;
    blockHash: string;
    contractAddress: ArkhamAddress;
    sender: ArkhamAddress;
    receiver: ArkhamAddress;
    unitValue0: number;
    unitValue1: number;
    historicalUSD: number;
    token0: string;
    token0Id: string;
    token0Name: string;
    token0Symbol: string;
    token0Decimals: number;
    token1: string;
    token1Id: string;
    token1Name: string;
    token1Symbol: string;
    token1Decimals: number;
    valid: boolean;
    contractEntityId: string;
}

export interface SwapParams {
    base: string[];
    chains?: string[];
    flow?: 'in' | 'out' | 'all';
    from?: string[];
    to?: string[];
    tokens?: string[];
    sold?: string[];
    bought?: string[];
    counterparties?: string[];
    senders?: string[];
    receivers?: string[];
    protocols?: string[];
    timeGte?: number;
    timeLte?: number;
    timeLast?: string;
    valueGte?: number;
    valueLte?: number;
    usdGte?: number;
    usdLte?: number;
    sortKey?: 'time' | 'value' | 'usd';
    sortDir?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
}

export interface SwapResponse {
    swaps: Swap[];
    count: number;
} 