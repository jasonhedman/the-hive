import useSWR from 'swr';

import { Portfolio } from '@/services/birdeye/types';

export const usePortfolio = (address: string) => {
    const { data, isLoading, error, mutate } = useSWR<Portfolio>(
        `/api/portfolio/${address}`,
        async (url: string) => fetch(url).then(res => res.json())
    );

    return { 
        data: data, 
        isLoading, 
        error, 
        mutate 
    };
} 