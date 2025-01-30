"use client"

import useSWR from "swr";

import type { MarketsResponseData } from "@/services/birdeye/types";

export const useTokenMarkets = (address: string) => {
    const { data, isLoading, error } = useSWR<MarketsResponseData>(
        `/api/token/${address}/markets`, 
        (url: string) => fetch(url).then(res => res.json()),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return { 
        data: data || null, 
        isLoading,
        error 
    };
}