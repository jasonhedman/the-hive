"use client"

import useSWR from "swr";

import type { TokenOverview } from "@/services/birdeye/types";

export const useTokenOverview = (address: string) => {
    const { data, isLoading, error } = useSWR<TokenOverview | null>(
        `/api/token/${address}/overview`, 
        (url: string) => fetch(url).then(res => res.json()),
        {
            refreshInterval: 5000,
        }
    );

    return { 
        data: data || null, 
        isLoading,
        error 
    };
}