"use client"

import useSWR from "swr";

import type { TokenMetadata } from "@/services/birdeye/types";

export const useTokenMetadata = (address: string) => {
    const { data, isLoading, error } = useSWR<TokenMetadata | null>(
        `/api/token/${address}/metadata`, 
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