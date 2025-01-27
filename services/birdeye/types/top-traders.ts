export interface TopTrader {
    network: string;
    address: string;
    pnl: number;
    volume: number;
    trade_count: number;
}

export interface TopTradersResponse {
    items: TopTrader[];
}

export enum TimeFrame {
    Yesterday = 'yesterday',
    Today = 'today',
    Week = '1W'
}