import useSWR from 'swr';

import type { LpPortfolio } from '@/services/raydium/types';

export const useRaydiumStandardPortfolio = (address: string) => {
    const { data, isLoading, error, mutate } = useSWR<LpPortfolio>(
        `/api/portfolio/${address}/raydium/standard`,
        async (url: string) => fetch(url).then(res => res.json())
    );

    return { 
        data: data, 
        isLoading, 
        error, 
        mutate 
    };
} 