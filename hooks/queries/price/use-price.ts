import useSWR from 'swr';

import { Price } from '@/services/birdeye/types';

export const usePrice = (mint: string) => {
    const { data, isLoading, error, mutate } = useSWR<Price>(
        `/api/token/${mint}/price`,
        async (url: string) => fetch(url).then(res => res.json())
    );

    return { 
        data, 
        isLoading, 
        error, 
        mutate 
    };
} 