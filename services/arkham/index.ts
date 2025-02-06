import { ArkhamAddress, ArkhamEntity, ChainStatus, HistoricalDataPoint, TagInfo } from './types/base-response';
import { Transfer, TransferHistogramDataPoint, TransferParams, TransferResponse, TransferHistogramParams } from './types/transfer';
import { Swap, SwapParams, SwapResponse } from './types/swap';
import { TokenHolder, TokenHolderResponse, TokenFlow, TokenVolume, TokenBalance, PortfolioResponse, PortfolioTimeSeriesResponse } from './types/token';
import { LoanResponse, CounterpartyParams, CounterpartyResponse } from './types/loan';

const BASE_URL = 'https://api.arkhamintelligence.com';

const request = async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    if (!process.env.ARKHAM_API_KEY) {
        throw new Error('ARKHAM_API_KEY environment variable is not set');
    }

    const url = new URL(endpoint, BASE_URL);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                if (Array.isArray(value)) {
                    url.searchParams.append(key, value.join(','));
                } else {
                    url.searchParams.append(key, String(value));
                }
            }
        });
    }

    const response = await fetch(url.toString(), {
        headers: {
            'API-Key': process.env.ARKHAM_API_KEY,
        },
    });

    if (!response.ok) {
        throw new Error(`Arkham API error: ${response.statusText}`);
    }

    return response.json();
};

// Transfer endpoints
export const getTransfers = (params: TransferParams): Promise<TransferResponse> => {
    return request<TransferResponse>('/transfers', params);
};

export const getTransferHistogram = (params: TransferHistogramParams): Promise<TransferHistogramDataPoint[]> => {
    return request<TransferHistogramDataPoint[]>('/transfers/histogram', params);
};

export const getTransfersByTx = (hash: string, chain: string, transferType: 'token' | 'internal' | 'external'): Promise<Transfer[]> => {
    return request<Transfer[]>(`/transfers/tx/${hash}`, { chain, transferType });
};

// Swap endpoints
export const getSwaps = (params: SwapParams): Promise<SwapResponse> => {
    return request<SwapResponse>('/swaps', params);
};

// Intelligence endpoints
export const getAddressIntelligence = (address: string, chain?: string): Promise<ArkhamAddress> => {
    const endpoint = chain ? `/intelligence/address/${address}?chain=${chain}` : `/intelligence/address/${address}`;
    return request<ArkhamAddress>(endpoint);
};

export const getAddressIntelligenceAll = (address: string): Promise<Record<string, ArkhamAddress>> => {
    return request<Record<string, ArkhamAddress>>(`/intelligence/address/${address}/all`);
};

export const getEntityIntelligence = (entityId: string): Promise<ArkhamEntity> => {
    return request<ArkhamEntity>(`/intelligence/entity/${entityId}`);
};

// Token endpoints
export const getTokenHolders = (chainOrId: string, address?: string): Promise<TokenHolderResponse> => {
    const endpoint = address ? `/token/holders/${chainOrId}/${address}` : `/token/holders/${chainOrId}`;
    return request<TokenHolderResponse>(endpoint);
};

export const getTokenTopFlowByChainAndAddress = (chain: string, address: string, timeLast: '1h' | '24h' | '7d' | '30d'): Promise<TokenFlow[]> => {
    return request<TokenFlow[]>(`/token/top_flow/${chain}/${address}`, { timeLast });
};

export const getTokenTopFlow = (
    chainOrId: string,
    addressOrTimeLast: string,
    timeLastOrChains?: string | string[],
    chains?: string[]
): Promise<TokenFlow[]> => {
    const params: Record<string, any> = {};
    let endpoint: string;

    if (chains) {
        endpoint = `/token/top_flow/${chainOrId}/${addressOrTimeLast}`;
        params.timeLast = timeLastOrChains as string;
        params.chains = chains;
    } else {
        endpoint = `/token/top_flow/${chainOrId}`;
        params.timeLast = addressOrTimeLast;
        if (timeLastOrChains) params.chains = timeLastOrChains;
    }

    return request<TokenFlow[]>(endpoint, params);
};

export const getTokenVolume = (
    tokenId: string,
    timeLast: string,
    granularity: string
): Promise<TokenVolume[]> => {
    return request<TokenVolume[]>(`/token/volume/${tokenId}`, { timeLast, granularity });
};

export const getTokenBalance = (
    tokenId: string,
    entityId?: string,
    address?: string
): Promise<TokenBalance> => {
    const params: Record<string, any> = {};
    if (entityId) params.entityID = entityId;
    if (address) params.address = address;
    return request<TokenBalance>(`/token/balance/${tokenId}`, params);
};

// Portfolio endpoints
export const getPortfolio = (
    entityId: string,
    time: number,
    chains?: string[]
): Promise<PortfolioResponse> => {
    return request<PortfolioResponse>(`/portfolio/entity/${entityId}`, { time, chains });
};

export const getPortfolioTimeSeries = (
    entityId: string,
    pricingId: string
): Promise<PortfolioTimeSeriesResponse> => {
    return request<PortfolioTimeSeriesResponse>(`/portfolio/timeSeries/entity/${entityId}`, { pricingId });
};

// Network endpoints
export const getNetworkStatus = (): Promise<Record<string, ChainStatus>> => {
    return request<Record<string, ChainStatus>>('/networks/status');
};

export const getNetworkHistory = (chain: string): Promise<HistoricalDataPoint[]> => {
    return request<HistoricalDataPoint[]>(`/networks/history/${chain}`);
};

// Loan endpoints
export const getLoans = (entityId: string, chains?: string[]): Promise<LoanResponse> => {
    return request<LoanResponse>(`/loans/entity/${entityId}`, { chains });
};

// Counterparty endpoints
export const getCounterparties = (
    entityId: string,
    params?: CounterpartyParams
): Promise<CounterpartyResponse> => {
    return request<CounterpartyResponse>(`/counterparties/entity/${entityId}`, params);
};

// Tag endpoints
export const getTag = (id: string): Promise<TagInfo> => {
    return request<TagInfo>(`/tag/${id}`);
};

export const getTagParams = (id: string): Promise<TagInfo[]> => {
    return request<TagInfo[]>(`/tag/${id}/params`);
};

export const getTagTop = (
    tag: string,
    page: number,
    tagParams?: string
): Promise<{
    entities: ArkhamEntity[];
    addresses: ArkhamAddress[];
}> => {
    return request<{
        entities: ArkhamEntity[];
        addresses: ArkhamAddress[];
    }>('/tag/top', { tag, page, tagParams });
};

export const getAllTags = (): Promise<TagInfo[]> => {
    return request<TagInfo[]>('/tag/all');
};

export const getTagEntityCount = (id: string): Promise<number> => {
    return request<number>(`/tag/${id}/count_entities`);
};

export const getTagAddressCount = (id: string): Promise<number> => {
    return request<number>(`/tag/${id}/count_addresses`);
}; 