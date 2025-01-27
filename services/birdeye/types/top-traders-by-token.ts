export interface TopTraderByToken {
    tokenAddress: string;
    owner: string;
    tags: string[];
    type: string;
    volume: number;
    trade: number;
    tradeBuy: number;
    tradeSell: number;
    volumeBuy: number;
    volumeSell: number;
}

export interface TopTradersByTokenResponse {
    items: TopTraderByToken[];
}

export enum TopTradersByTokenTimeFrame {
    ThirtyMin = '30m',
    OneHour = '1h', 
    TwoHours = '2h',
    FourHours = '4h',
    SixHours = '6h',
    EightHours = '8h',
    TwelveHours = '12h',
    TwentyFourHours = '24h'
}
export enum TopTradersByTokenSortType {
    Ascending = 'asc',
    Descending = 'desc'
}
export enum TopTradersByTokenSortBy {
    Volume = 'volume',
    Trade = 'trade',
}