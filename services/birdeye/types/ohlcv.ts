export interface OHLCVData {
    o: number;  // Open price
    h: number;  // High price
    l: number;  // Low price
    c: number;  // Close price
    v: number;  // Volume
    unixTime: number;
    address: string;
    type: OHLCVTimeframe;
}

export interface OHLCVResponse {
    items: OHLCVData[];
}

export enum OHLCVTimeframe {
    OneMinute = '1m',
    ThreeMinutes = '3m',
    FiveMinutes = '5m',
    FifteenMinutes = '15m',
    ThirtyMinutes = '30m',
    OneHour = '1H',
    TwoHours = '2H',
    FourHours = '4H',
    SixHours = '6H',
    EightHours = '8H',
    TwelveHours = '12H',
    OneDay = '1D',
    ThreeDays = '3D',
    OneWeek = '1W',
    OneMonth = '1M'
} 