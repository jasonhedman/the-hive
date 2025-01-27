"use client"

import useSWR from 'swr';

import { OHLCVData, OHLCVTimeframe } from '@/services/birdeye/types';

export const usePriceChart = (mint: string, timeframe: OHLCVTimeframe, numDays: number) => {

    const { data, isLoading, error, mutate } = useSWR<OHLCVData[]>(
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