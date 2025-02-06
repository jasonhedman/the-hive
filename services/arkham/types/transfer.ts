import { ArkhamAddress } from './base-response';

export interface Transfer {
    transactionHash: string;
    transactionIndex?: number;
    fromAddress: ArkhamAddress;
    fromIsContract: boolean;
    toAddress: ArkhamAddress;
    toIsContract: boolean;
    logIndex?: number | null;
    traceID?: string | null;
    tokenAddress?: string | null;
    type: 'external' | 'internal' | 'token';
    blockTimestamp: string;
    blockNumber: number;
    blockHash: string;
    tokenName?: string;
    tokenSymbol?: string;
    tokenDecimals?: number;
    unitValue?: string;
    tokenId?: string;
    historicalPrice?: number;
    historicalUSD?: number;
    quoteTime?: string;
}

export interface TransferHistogramDataPoint {
    time: string;
    count: number;
    usd: number;
}

export interface TransferParams {
    base: string[];
    chains?: string[];
    flow?: 'in' | 'out' | 'all';
    from?: string[];
    to?: string[];
    tokens?: string[];
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

export interface TransferResponse {
    transfers: Transfer[];
    count: number;
}

export interface TransferHistogramParams extends TransferParams {
    granularity: '1d' | '1h';
}

export interface TransferHistogramResponse {
    data: TransferHistogramDataPoint[];
} 