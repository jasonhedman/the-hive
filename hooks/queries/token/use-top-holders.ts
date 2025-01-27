"use client"

import useSWR from "swr";

import type { TokenHolder } from "@/services/birdeye/types";

export const useTopHolders = (address: string) => {
    const { data, isLoading, error } = useSWR<TokenHolder[]>(
        `/api/token/${address}/top-holders`, 
        (url: string) => fetch(url).then(res => res.json()),
    );

    return { 
        data: data || [], 
        isLoading,
        error 
    };
}