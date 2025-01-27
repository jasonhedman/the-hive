export type PortfolioResponseItem = {
    address: string;
    decimals: number;
    balance: number;
    uiAmount: number;
    chainId: string;
}

export type PortfolioResponse = {
    wallet: string;
    items: PortfolioResponseItem[];
}

export type PortfolioItem = PortfolioResponseItem & {
    name: string;
    symbol: string;
    logoURI: string;
    priceUsd: number;
    valueUsd: number;
}

export type Portfolio = {
    wallet: string;
    totalUsd: number;
    items: PortfolioItem[];
}