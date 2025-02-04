"use client"

import useSWR from 'swr';

import { TokenPriceCandlestick, CandlestickGranularity } from '@/services/hellomoon/types';

export const usePriceChart = (mint: string, timeframe: CandlestickGranularity, numDays: number) => {

    const { data, isLoading, error, mutate } = useSWR<TokenPriceCandlestick[]>(
        `/api/token/${mint}/prices/${timeframe}/${numDays}`,
        async () => fetch(`/api/token/${mint}/prices`, {
            method: 'POST',
            body: JSON.stringify({
                timeframe,
                numDays
            })
        }).then(res => res.json()),
        {
            refreshInterval: 5000
        }
    );

    return { 
        data: data || [], 
        isLoading, 
        error, 
        mutate 
    };
} 